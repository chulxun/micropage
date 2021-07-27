<template>
  <sizeEditor :element="element"></sizeEditor>
  <component :is="element.name" :element="element"></component>
</template>
<script lang="ts">
import { defineComponent, computed, watch, reactive } from "vue";
import sizeEditor from "./commonProps/sizeEditor.vue";
import plugImage from "./plug-image/editor.vue";
import plugButton from "./plug-button/editor.vue";
import plugVideo from "./plug-video/editor.vue";
import plugBgAudio from "./plug-bg-audio/editor.vue";
import plugFormInput from "./plug-form-input/editor.vue";
import plugFormButton from "./plug-form-button/editor.vue";
export default defineComponent({
  props: ["element"],
  components: {
    sizeEditor,
    plugImage,
    plugButton,
    plugVideo,
    plugBgAudio,
    plugFormInput,
    plugFormButton,
  },
  setup(props) {},
});
</script>
<style lang='less' scoped>
.element {
  position: absolute;
}
</style>