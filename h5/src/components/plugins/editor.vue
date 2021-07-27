<template>
  <sizeEditor :element="element"></sizeEditor>
  <component :is="element.name" :element="element"></component>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
export default defineComponent({
  props: ["element"],
  components: {
    sizeEditor: defineAsyncComponent(
      () => import("./commonProps/sizeEditor.vue")
    ),
    plugImage: defineAsyncComponent(() => import("./plug-image/editor.vue")),
    plugButton: defineAsyncComponent(() => import("./plug-button/editor.vue")),
    plugText: defineAsyncComponent(() => import("./plug-text/editor.vue")),
    plugSwiper: defineAsyncComponent(() => import("./plug-swiper/editor.vue")),
    plugVideo: defineAsyncComponent(() => import("./plug-video/editor.vue")),
    plugBgAudio: defineAsyncComponent(
      () => import("./plug-bg-audio/editor.vue")
    ),
    plugFormInput: defineAsyncComponent(
      () => import("./plug-form-input/editor.vue")
    ),
    plugFormButton: defineAsyncComponent(
      () => import("./plug-form-button/editor.vue")
    ),
    plugFormCheckbox: defineAsyncComponent(
      () => import("./plug-form-checkbox/editor.vue")
    ),
    plugFormRadio: defineAsyncComponent(
      () => import("./plug-form-radio/editor.vue")
    ),
    plugFormRate: defineAsyncComponent(
      () => import("./plug-form-rate/editor.vue")
    ),
    plugFormDatetime: defineAsyncComponent(
      () => import("./plug-form-datetime/editor.vue")
    ),
    plugFormArea: defineAsyncComponent(
      () => import("./plug-form-area/editor.vue")
    ),
  },
  setup(props) {},
});
</script>
<style lang='less' scoped>
.element {
  position: absolute;
}
</style>