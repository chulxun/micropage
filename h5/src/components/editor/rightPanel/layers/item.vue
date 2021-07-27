<template>
  <img v-if="item.props.imgUrl" :src="item.props.imgUrl" class="icon" />
  <i v-else :class="'fa ' + eleInfo.icon"></i>
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
          return { icon: "fa-music", title: "音乐" };
        case "plug-button":
          return { icon: "fa-hand-pointer-o", title: props.item.props.text };
        case "plug-image":
          return { icon: "fa-picture-o", title: "图片" };
        case "plug-swiper":
          return { icon: "el-icon-picture", title: "轮播图" };
        case "plug-text":
          return { icon: "fa-file-text-o", title: "富文本" };
        case "plug-video":
          return { icon: "fa-file-movie-o", title: "视频" };
        case "plug-form-button":
          return { icon: "fa-send-o", title: props.item.props.text };
        case "plug-form-input":
          return { icon: "el-icon-edit", title: props.item.props.name };
        case "plug-form-rate":
          return { icon: "fa-star-half-o", title: props.item.props.name };
        case "plug-form-radio":
          return { icon: "fa-dot-circle-o", title: props.item.props.name };
        case "plug-form-checkbox":
          return { icon: "fa-check-square", title: props.item.props.name };
        case "plug-form-datetime":
          return { icon: "el-icon-date", title: props.item.props.name };
        case "plug-form-area":
          return { icon: "el-icon-map-location", title: props.item.props.name };
        default:
          return { icon: "fa-file-o", title: "未识别元素" };
      }
    });
    return { eleInfo };
  },
});
</script>
<style lang='less' scoped>
</style>