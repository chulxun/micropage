<template>
  <img v-if="item.props.imgUrl" :src="item.props.imgUrl" class="icon_img" />
  <i v-else :class="eleInfo.icon"></i>
  <p>{{ eleInfo.title }}</p>
</template>
<script setup lang='ts'>
import { computed } from "vue";
const props = defineProps<{
  item: H5.Options
}>()
const eleInfo = computed(() => {
  let name = props.item.name;
  switch (name) {
    case "plug-bg-audio":
      return { icon: "iconfont icon-music", title: "音乐" };
    case "plug-button":
      return { icon: "iconfont icon-anniu", title: props.item.props.text };
    case "plug-image":
      return { icon: "", title: "图片" };
    case "plug-swiper":
      return { icon: "iconfont icon-lunbotu", title: "轮播图" };
    case "plug-text":
      return { icon: "iconfont icon-28fuwenbenkuang", title: "富文本" };
    case "plug-video":
      return { icon: "iconfont icon-shipin", title: "视频" };
    case "plug-countdown":
      return {
        icon: "iconfont icon-daojishi",
        title: "倒计时",
      };
    case "plug-noticebar":
      return {
        icon: "iconfont icon-tongzhi",
        title: props.item.props.text,
      };
    case "plug-tabs":
      return {
        icon: "iconfont icon-tabs",
        title: "Tab标签栏",
      };
    case "plug-collapse":
      return {
        icon: "iconfont icon-zhediemianban",
        title: "折叠面板",
      };
    case "plug-form-button":
      return {
        icon: "iconfont icon-anniuguanli-02",
        title: props.item.props.text,
      };
    case "plug-form-input":
      return { icon: "iconfont icon-shurukuang", title: props.item.props.name };
    case "plug-form-rate":
      return {
        icon: "iconfont icon-pingfen",
        title: props.item.props.name,
      };
    case "plug-form-radio":
      return {
        icon: "iconfont icon-danxuankuang",
        title: props.item.props.name,
      };
    case "plug-form-checkbox":
      return {
        icon: "iconfont icon-duoxuankuang",
        title: props.item.props.name,
      };
    case "plug-form-datetime":
      return { icon: "iconfont icon-shijianxuanze", title: props.item.props.name };
    case "plug-form-area":
      return { icon: "iconfont icon-shengshiquyu", title: props.item.props.name };
    case "plug-form-picker":
      return {
        icon: "iconfont icon-icon__xuanzekemu",
        title: props.item.props.name,
      };
    default:
      return { icon: 'iconfont icon-weishibie', title: "未识别元素" };
  }
});
</script>
<style lang='less' scoped>
</style>