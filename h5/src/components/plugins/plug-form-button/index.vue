<template>
  <button @click="onSubmit">{{ element.props.text }}</button>
</template>
<script setup lang="ts">
import { Toast, Dialog } from "vant";
import { submitData } from "@/api/form";
import { getSearchQueryString } from "@/utils/index";
const props = defineProps<{
  element: H5.Element,
  workMode: String
}>()
const mode = getSearchQueryString("mode");
const workId = getSearchQueryString("workId");
//提交表单
async function onSubmit() {
  if (props.workMode == "editor") return;
  let inputs = document.querySelectorAll("[data-type^='form-input']");
  if (!inputs.length) return;
  let hasRequired = false;
  for (let i = 0; i < inputs.length; i++) {
    let input: any = inputs[i];
    if (input.hasAttribute("required") && !input.value) {
      hasRequired = true;
      Toast("必填项不能为空");
      break;
    }
    if (input.getAttribute("type") == "password" && input.value != "") {
      var regu = /^[~!@#$%^&*\-+=_.0-9a-zA-Z]{8,16}$/;
      var re = new RegExp(regu);
      if (!re.test(input.value)) {
        hasRequired = true;
        Toast("密码必须由8-16位数字、字母和特殊字符~!@#$%^&*-+=_.");
        break;
      }
    }
    if (input.getAttribute("type") == "tel" && input.value != "") {
      var regu = /^1(1|2|3|4|5|6|7|8|9|0)\d{9}$/;
      var re = new RegExp(regu);
      if (!re.test(input.value)) {
        hasRequired = true;
        Toast("请输入正确的手机号码");
        break;
      }
    }
    if (input.getAttribute("type") == "email" && input.value != "") {
      var regu = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
      var re = new RegExp(regu);
      if (!re.test(input.value)) {
        hasRequired = true;
        Toast("请输入正确的邮箱");
        break;
      }
    }
  }
  if (hasRequired) return;
  if (mode == "preview") {
    return Dialog.alert({
      title: "预览链接不能提交表单，作品发布后提交",
    }).then(() => {
      //预览或者作品页 刷新
      if (props.element.props?.successHref) {
        window.location.href = props.element.props.successHref;
      } else {
        window.location.reload();
      }
    });
  }
  let params: any = {
    work_id: workId,
    form_data: {},
  };
  inputs.forEach(
    (input: any) => (params.form_data[input.dataset.id] = input.value)
  );
  console.log(params.form_data);
  params.form_data = encodeURIComponent(JSON.stringify(params.form_data));
  const res = await submitData(params);
  if (res && res.code == 0) {
    //成功提交后
    let html = "";
    if (props.element.props?.imgUrl) {
      html =
        "<img src=" +
        props.element.props.imgUrl +
        " style='max-width:100%;max-height:100%;' />";
    }
    Dialog.alert({
      title: props.element.props?.successToast || "表单成功提交",
      allowHtml: true,
      message: `${html}`,
    }).then(() => {
      //预览或者作品页 刷新
      if (props.element.props?.successHref) {
        window.location.href = props.element.props.successHref;
      } else {
        window.location.reload();
      }
    });
  } else {
    Toast(res.massage);
  }
}

</script>
<style lang='less' scoped>
</style>