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
import { pxToRem,getElementInsideStyle } from "@/utils/element";
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
      const style = getElementInsideStyle(props.element.name,props.element.style, isRem)
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
:deep(.van-radio__label){
  color: inherit;
}
:deep(.van-checkbox__label){
  color: inherit;
}
:deep(.van-cell) {
  background: transparent;
  height: 100%;
  font-size: inherit;
  color: inherit;
  .van-field__label,
  .van-cell__value {
    color: inherit;
    display: flex;
    align-items: center;
    text-align: inherit;
    .van-field__body {
      flex: 1;
      height: 100%;
      text-align: inherit;
      input {
        text-align: inherit;
      }
    }
  }
  .hide {
    display: none;
  }
}
</style>