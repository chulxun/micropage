<template>
  <input
    :disabled="workMode == 'editor'"
    :type="props.type"
    :required="props.required ? true : false"
    :placeholder="props.placeholder"
    autocomplete="off"
    :maxlength="props.maxlength"
    data-type="form-input"
  />
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: ["props", "workMode"],
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
      required: true,
      maxlength: 50,
    },
  },
  setup(props) {},
});
</script>
<style lang='less' scoped>
input {
  padding: 0 10px;
}
</style>