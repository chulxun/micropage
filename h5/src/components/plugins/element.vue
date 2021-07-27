<template>
  <component
    :data-ukey="element.ukey"
    :is="element.name"
    :workMode="workMode"
    :props="element.props"
    :style="comStyles"
    class="element"
  ></component>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { pxToRem } from "@/utils/element";
import importPlugs from "@/mixins/importPlugs";
import { useStore } from "@/store/index";

export default defineComponent({
  props: ["element"],
  mixins: [importPlugs],
  setup(props) {
    const store = useStore();

    const workMode = computed(() => store.state.editor.workMode);
    //提取属性中设置的样式
    const comStyles = computed(() => {
      const isRem = workMode.value == "formal" ? true : false;
      let style = {};
      let elestyle = props.element.style;

      if (elestyle.fontSize) {
        style.fontSize = isRem
          ? pxToRem(elestyle.fontSize)
          : elestyle.fontSize + "px";
      }
      if (elestyle.borderRadius) {
        style.borderRadius = isRem
          ? pxToRem(elestyle.borderRadius)
          : elestyle.borderRadius + "px";
      }
      if (elestyle.backgroundColor) {
        style.backgroundColor = elestyle.backgroundColor;
      }
      if (elestyle.color) {
        style.color = elestyle.color;
      }
      if (elestyle.textAlign) {
        style.textAlign = elestyle.textAlign;
      }
      if (elestyle.borderWidth) {
        style.borderWidth = isRem
          ? pxToRem(elestyle.borderWidth)
          : elestyle.borderWidth + "px";
      }
      if (elestyle.borderColor) {
        style.borderColor = elestyle.borderColor;
      }
      if (elestyle.fontWeight) {
        style.fontWeight = elestyle.fontWeight;
      }
      if (elestyle.padding) {
        style.padding = isRem
          ? pxToRem(elestyle.padding)
          : elestyle.padding + "px";
      }
      return style;
    });
    return {
      workMode,
      comStyles,
    };
  },
});
</script>
<style lang='less' scoped>
// 请注意：所有插件元素template中的父元素只能有一个
.element {
  width: 100%;
  height: 100%;
  border-style: solid;
  border-width: 0;
  position: absolute;
}
:deep(.input_title) {
  padding-bottom: 0.3em;
  font-size: 1.2em;
  .red {
    color: red;
    font-weight: bold;
  }
}
</style>