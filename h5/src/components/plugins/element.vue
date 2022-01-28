<template>
  <component
    :is="curComponent"
    :workMode="workMode"
    :element="element"
    :style="comStyles"
    class="element"
  ></component>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { getElementInsideStyle } from "@/utils/element";
// 基础
import plugPage from "@/components/plugins/plug-page/index.vue";
import plugImage from "@/components/plugins/plug-image/index.vue";
import plugSwiper from "@/components/plugins/plug-swiper/index.vue";
import plugButton from "@/components/plugins/plug-button/index.vue";
import plugText from "@/components/plugins/plug-text/index.vue";
import plugVideo from "@/components/plugins/plug-video/index.vue";
import plugBgAudio from "@/components/plugins/plug-bg-audio/index.vue";
import plugTimer from "@/components/plugins/plug-timer/index.vue";
import plugNoticebar from "@/components/plugins/plug-noticebar/index.vue";
import plugTabs from "@/components/plugins/plug-tabs/index.vue";
import plugCollapse from "@/components/plugins/plug-collapse/index.vue";
// 表单
import plugFormInput from "@/components/plugins/plug-form-input/index.vue";
import plugFormButton from "@/components/plugins/plug-form-button/index.vue";
import plugFormCheckbox from "@/components/plugins/plug-form-checkbox/index.vue";
import plugFormRadio from "@/components/plugins/plug-form-radio/index.vue";
import plugFormRate from "@/components/plugins/plug-form-rate/index.vue";
import plugFormDatetime from "@/components/plugins/plug-form-datetime/index.vue";
import plugFormArea from "@/components/plugins/plug-form-area/index.vue";
import plugFormPicker from "@/components/plugins/plug-form-picker/index.vue";
import { useStore } from "@/store/index";
const props = defineProps<{
  element: H5.Element
}>()
const store = useStore();
const workMode = computed(() => store.state.editor.workMode);
//提取属性中设置的样式
const comStyles = computed(() => {
  const isRem = workMode.value == "formal" ? true : false;
  const style = getElementInsideStyle(props.element.name, props.element.style, isRem)
  return style;
});
// 获取动态组件
const curComponent = computed(() => {
  switch (props.element.name) {
    // 基础
    case 'plug-page':
      return plugPage
    case 'plug-image':
      return plugImage
    case 'plug-button':
      return plugButton
    case 'plug-swiper':
      return plugSwiper
    case 'plug-text':
      return plugText
    case 'plug-video':
      return plugVideo
    case 'plug-timer':
      return plugTimer
    case 'plug-noticebar':
      return plugNoticebar
    case 'plug-bg-audio':
      return plugBgAudio
    case 'plug-tabs':
      return plugTabs
    case 'plug-collapse':
      return plugCollapse
    // 表单
    case 'plug-form-button':
      return plugFormButton
    case 'plug-form-input':
      return plugFormInput
    case 'plug-form-rate':
      return plugFormRate
    case 'plug-form-radio':
      return plugFormRadio
    case 'plug-form-checkbox':
      return plugFormCheckbox
    case 'plug-form-area':
      return plugFormArea
    case 'plug-form-datetime':
      return plugFormDatetime
    case 'plug-form-picker':
      return plugFormPicker
    default:
      return null
  }
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
:deep(.van-radio__label) {
  color: inherit;
}
:deep(.van-checkbox__label) {
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