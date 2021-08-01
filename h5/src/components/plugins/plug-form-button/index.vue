<template>
  <button @click="onSubmit">{{ props.text }}</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Toast, Dialog } from "vant";
import { submitData } from "@/api/form";
import { getSearchQueryString } from "@/utils/index";
export default defineComponent({
  props: ["props", "workMode"],
  name: "plug-form-button",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 120,
      height: 40,
      backgroundColor: "#fff",
      borderRadius: 3,
      textAlign: "center",
      color: "#333",
      fontSize: 14,
      borderColor: "#fff",
      borderWidth: 0,
      fontWeight: "normal",
      padding: 10,
    },
    props: {
      text: "提交",
      successToast: "表单数据提交成功",
      imgUrl: "",
      successHref: "",
    },
  },
  setup(props) {
    const mode = getSearchQueryString("mode");
    const workId = getSearchQueryString("workId");
    //提交表单
    async function onSubmit() {
      if (props.workMode == "editor") return;
      let inputs = document.querySelectorAll("[data-type^='form-input']");
      if (!inputs.length) return;
      let hasRequired = false;
      for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
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
          if (props.props.successHref) {
            window.location.href = props.props.successHref;
          } else {
            window.location.reload();
          }
        });
      }
      let params = {
        work_id: workId,
        form_data: {},
      };
      inputs.forEach(
        (input) => (params.form_data[input.dataset.id] = input.value)
      );
      console.log(params.form_data);
      params.form_data = encodeURIComponent(JSON.stringify(params.form_data));
      const res = await submitData(params);
      if (res && res.code == 0) {
        //成功提交后
        let html = "";
        if (props.props.imgUrl) {
          html =
            "<img src=" +
            props.props.imgUrl +
            " style='max-width:100%;max-height:100%;' />";
        }
        Dialog.alert({
          title: props.props.successToast || "表单成功提交",
          allowHtml: true,
          message: `${html}`,
        }).then(() => {
          //预览或者作品页 刷新
          if (props.props.successHref) {
            window.location.href = props.props.successHref;
          } else {
            window.location.reload();
          }
        });
      } else {
        Toast(res.massage);
      }
    }
    return { onSubmit };
  },
});
</script>
<style lang='less' scoped>
</style>