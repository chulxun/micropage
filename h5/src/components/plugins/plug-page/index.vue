<template>
  <div v-if="element" class="plug-page" :style="bgStyle"></div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const bgStyle = computed(() => {
  let style: any = {
    backgroundColor: props.element.props.bgColor,
    backgroundImage: "url(" + props.element.props.imgUrl + ")",
  };
  if (props.element.props.bgSize) {
    style.backgroundSize = props.element.props.bgSize;
  }
  if (props.element.props.bgPosition) {
    style.backgroundPosition = props.element.props.bgPosition;
  }
  if (props.element.props.bgRepeat) {
    style.backgroundRepeat = props.element.props.bgRepeat;
  }
  return style;
});
</script>
<style lang='less' scoped>
.plug-page {
  position: absolute;
  top: 0;
  left: 0;
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>