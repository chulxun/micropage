<template>
  <div
    :class="{
      'animation-box': true,
      animCan: hasAnimate,
      noani: element.name == 'plug-page',
    }"
    :style="curAnimate"
    ref="animationBox"
    @click.stop="onClickEvent"
  >
    <slot></slot>
    <Popup
      teleport="#app"
      v-if="element.props.clickType == 3"
      v-model:show="show"
      round
      :style="{
        width: '80%',
        minHeight: '30%',
        maxHeight: '80%',
        padding: '16px 0',
        display: 'flex',
      }"
    >
      <div class="text">{{ element.props.clickContent }}</div>
    </Popup>
  </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { Toast, Popup } from "vant";
const props = defineProps<{
  element: H5.Element
}>()
const animationBox: any = ref(null);
const curAnimate = ref({});
const hasAnimate = ref(false);
const show = ref(false);
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
//触发 在属性面板设置的点击事件
function onClickEvent() {
  if (props.element.props.clickType && props.element.props.clickContent) {
    let clickType = props.element.props.clickType;
    let clickContent = props.element.props.clickContent;
    switch (clickType) {
      case 1:
        window.location.href = clickContent;
        break;
      case 2:
        Toast(clickContent);
        break;
      case 3:
        show.value = true;
        break;
      default:
        break;
    }
  }
}
onMounted(() => {
  anis = props.element.animations;
  if (anis && anis.length > 0) {
    hasAnimate.value = true;
    // 监听当前dom是否在可视区域，在的话才开始动画
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries[0].intersectionRatio <= 0) return
      index = 0
      playAnimation(anis[0])
      intersectionObserver.unobserve(animationBox.value)
    })
    // start observing
    intersectionObserver.observe(animationBox.value)
    //监听顺序播放动画
    if (animationBox.value)
      animationBox.value.addEventListener("animationend", function () {
        if (anis.length > index + 1) {
          index++;
          playAnimation(anis[index]);
        } else if (anis.length == index + 1) {
          index = 0;
          //动画播放完毕，清空状态
          curAnimate.value = {};
        }
      });
  }
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
.text {
  padding: 0 16px;
  word-break: break-all;
  white-space: pre-line;
  flex: 1;
  overflow-y: auto;
}
</style>