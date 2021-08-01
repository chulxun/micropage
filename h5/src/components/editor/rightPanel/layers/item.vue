<template>
  <img v-if="item.props.imgUrl" :src="item.props.imgUrl" class="icon" />
  <i v-else :class="eleInfo.icon"></i>
  <p>{{ eleInfo.title }}</p>
</template>
<script lang='ts'>
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: ["item"],
  setup(props) {
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
          return { icon: "el-icon-picture", title: "轮播图" };
        case "plug-text":
          return { icon: "iconfont icon-28fuwenbenkuang", title: "富文本" };
        case "plug-video":
          return { icon: "iconfont icon-shipin", title: "视频" };
        case "plug-countdown":
          return {
            icon: "iconfont icon-daojishi",
            title: props.item.props.name,
          };
        case "plug-noticebar":
          return {
            icon: "el-icon-bell",
            title: props.item.props.text,
          };
        case "plug-tabs":
          return {
            icon: "iconfont icon-tabs",
            title: props.item.props.name,
          };
        case "plug-form-button":
          return {
            icon: "iconfont icon-anniuguanli-02",
            title: props.item.props.text,
          };
        case "plug-form-input":
          return { icon: "el-icon-edit", title: props.item.props.name };
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
          return { icon: "el-icon-date", title: props.item.props.name };
        case "plug-form-area":
          return { icon: "el-icon-map-location", title: props.item.props.name };
        case "plug-form-picker":
          return {
            icon: "iconfont icon-icon__xuanzekemu",
            title: props.item.props.name,
          };

        default:
          return { icon: "el-icon-folder", title: "未识别元素" };
      }
    });
    return { eleInfo };
  },
});
</script>
<style lang='less' scoped>
</style>