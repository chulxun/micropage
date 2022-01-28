<template>
  <sizeEditor :element="element"></sizeEditor>
  <component :is="curComponent" :element="element"></component>
</template>
<script setup lang="ts">
import { computed } from "vue";
import sizeEditor from "./commonProps/sizeEditor.vue"
import plugImage from "./plug-image/editor.vue"
import plugButton from "./plug-button/editor.vue"
import plugText from "./plug-text/editor.vue"
import plugSwiper from "./plug-swiper/editor.vue"
import plugVideo from "./plug-video/editor.vue"
import plugBgAudio from "./plug-bg-audio/editor.vue"
import plugTimer from "./plug-timer/editor.vue"
import plugNoticebar from "./plug-noticebar/editor.vue"
import plugTabs from "./plug-tabs/editor.vue"
import plugCollapse from "./plug-collapse/editor.vue"
import plugFormInput from "./plug-form-input/editor.vue"
import plugFormButton from "./plug-form-button/editor.vue"
import plugFormCheckbox from "./plug-form-checkbox/editor.vue"
import plugFormRadio from "./plug-form-radio/editor.vue"
import plugFormRate from "./plug-form-rate/editor.vue"
import plugFormDatetime from "./plug-form-datetime/editor.vue"
import plugFormArea from "./plug-form-area/editor.vue"
import plugFormPicker from "./plug-form-picker/editor.vue"
const props = defineProps<{
  element: H5.Element
}>()
// const sizeEditor = defineAsyncComponent(() => import("./commonProps/sizeEditor.vue"))
// const plugImage = defineAsyncComponent(() => import("./plug-image/editor.vue"))
// const plugButton = defineAsyncComponent(() => import("./plug-button/editor.vue"))
// const plugText = defineAsyncComponent(() => import("./plug-text/editor.vue"))
// const plugSwiper = defineAsyncComponent(() => import("./plug-swiper/editor.vue"))
// const plugVideo = defineAsyncComponent(() => import("./plug-video/editor.vue"))
// const plugBgAudio = defineAsyncComponent(
//   () => import("./plug-bg-audio/editor.vue")
// )
// const plugTimer = defineAsyncComponent(() => import("./plug-timer/editor.vue"))
// const plugNoticebar = defineAsyncComponent(
//   () => import("./plug-noticebar/editor.vue")
// )
// const plugTabs = defineAsyncComponent(() => import("./plug-tabs/editor.vue"))
// const plugCollapse = defineAsyncComponent(
//   () => import("./plug-collapse/editor.vue")
// )
// const plugFormInput = defineAsyncComponent(
//   () => import("./plug-form-input/editor.vue")
// )
// const plugFormButton = defineAsyncComponent(
//   () => import("./plug-form-button/editor.vue")
// )
// const plugFormCheckbox = defineAsyncComponent(
//   () => import("./plug-form-checkbox/editor.vue")
// )
// const plugFormRadio = defineAsyncComponent(
//   () => import("./plug-form-radio/editor.vue")
// )
// const plugFormRate = defineAsyncComponent(
//   () => import("./plug-form-rate/editor.vue")
// )
// const plugFormDatetime = defineAsyncComponent(
//   () => import("./plug-form-datetime/editor.vue")
// )
// const plugFormArea = defineAsyncComponent(
//   () => import("./plug-form-area/editor.vue")
// )
// const plugFormPicker = defineAsyncComponent(
//   () => import("./plug-form-picker/editor.vue")
// )


// 获取动态组件
const curComponent = computed(() => {
  switch (props.element.name) {
    // 基础
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
.element {
  position: absolute;
}
:deep(.small_input_number) {
  width: 110px;
}
</style>