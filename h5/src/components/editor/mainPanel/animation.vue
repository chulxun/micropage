<template>
  <div
    :class="{ 'animation-box': true, noani: element.name == 'plug-page' }"
    :style="curAnimate"
    ref="animationBox"
  >
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { Ref, defineComponent, ref, watch, onMounted } from "vue";
export default defineComponent({
  props: ["element"],
  setup(props) {
    const animationBox: Ref<HTMLElement | null> = ref(null);
    const curAnimate = ref({});
    let index = 0;
    let anis: any = [];
    // //播放一个动画
    function playAnimation(item: any) {
      curAnimate.value = {
        display: "none",
      };
      let animationStyle = {
        animationName: item.classname,
        animationDuration: `${item.duration}s`,
        animationIterationCount: item.infinite ? "infinite" : item.count,
        animationDelay: `${item.delay}s`,
        animationTimingFunction: item.timing || "ease",
        display: "block",
      };
      setTimeout(() => {
        curAnimate.value = animationStyle;
      }, 10);
    }
    onMounted(() => {
      //监听顺序播放动画
      if (animationBox.value)
        animationBox.value.addEventListener("animationend", function () {
          if (anis.length > index + 1) {
            index++;
            playAnimation(anis[index]);
          } else if (anis.length == index + 1) {
            index = 0;
            //动画播放完毕，清空状态
            for (let val of props.element.animations) {
              val.playing = false;
            }
            curAnimate.value = {};
          }
        });
    }),
      //监听动画面板
      watch(
        () => props.element.animations,
        function (val) {
          anis = val.filter((item: any) => {
            return item.playing == true;
          });
          if (anis.length > 0) {
            index = 0;
            playAnimation(anis[0]);
          }
        },
        {
          deep: true,
        }
      );
    return {
      animationBox,
      curAnimate,
      playAnimation,
    };
  },
});
</script>
<style lang='less' scoped>
.animation-box {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  &.noani {
    z-index: 0;
  }
}
</style>