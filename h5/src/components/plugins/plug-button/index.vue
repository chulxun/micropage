<template>
  <button class="plug-btn">{{ props.text }}</button>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  props: ["props", "workMode"],
  name: "plug-button",
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
    },
    props: {
      text: "按钮文案",
      clickType: 0,
      clickContent: "",
    },
  },
  setup(props) {},
});
</script>
<style lang='less' scoped>
.plug-btn {
}
</style>