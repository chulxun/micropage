<template>
  <div v-if="props" class="plug-page" :style="bgStyle"></div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: ["props"],
  name: "plug-page",
  setup(props) {
    const bgStyle = computed(() => {
      let style = {
        backgroundColor: props.props.bgColor,
        backgroundImage: "url(" + props.props.imgUrl + ")",
      };
      if (props.props.bgSize) {
        style.backgroundSize = props.props.bgSize;
      }
      if (props.props.bgPosition) {
        style.backgroundPosition = props.props.bgPosition;
      }
      if (props.props.bgRepeat) {
        style.backgroundRepeat = props.props.bgRepeat;
      }
      return style;
    });

    return { bgStyle };
  },
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