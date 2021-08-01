<template>
  <div>
    <van-field
      v-model="inputVal"
      :readonly="workMode == 'editor'"
      :type="props.type"
      :required="props.required"
      :placeholder="props.placeholder"
      autocomplete="off"
      :maxlength="props.maxlength"
      :label-class="{
        hide: props.showTitle == false,
        textareaLabel: props.type == 'textarea',
      }"
      :label="props.showTitle ? props.name : ''"
      :border="false"
      :colon="true"
      :show-word-limit="props.showWordLimit"
      :label-width="
        workMode == 'formal'
          ? pxToRem(props.labelWidth)
          : props.labelWidth + 'px'
      "
    />
    <input
      type="hidden"
      :value="inputVal"
      :data-id="dataUkey"
      data-type="form-input"
      :required="props.required"
    />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import { Field } from "vant";
import { pxToRem } from "@/utils/element";
export default defineComponent({
  props: ["props", "dataUkey", "workMode"],
  components: {
    [Field.name]: Field,
  },
  name: "plug-form-input",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 335,
      height: 40,
      left: 20,
      backgroundColor: "#fff",
      borderRadius: 3,
      textAlign: "left",
      color: "#333",
      fontSize: 14,
      borderColor: "#fff",
      borderWidth: 0,
      fontWeight: "normal",
    },
    props: {
      type: "text",
      placeholder: "请输入",
      name: "标题",
      showTitle: true,
      required: true,
      maxlength: 50,
      showWordLimit: false,
      labelWidth: 80,
    },
  },
  setup(props) {
    const inputVal = ref("");
    return { inputVal, pxToRem };
  },
});
</script>
<style lang='less' scoped>
:deep(.van-cell) {
  .van-field__label,
  .van-cell__value {
    .van-field__body {
      flex: 1;
      textarea {
        height: 100%;
      }
    }
    .van-field__word-limit {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  .textareaLabel {
    align-items: flex-start;
  }
}
</style>