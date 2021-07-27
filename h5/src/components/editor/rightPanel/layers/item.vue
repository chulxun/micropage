<template>
  <img v-if="item.props.imgUrl" :src="item.props.imgUrl" class="icon" />
  <i v-else :class="'fa ' + eleInfo.icon"></i>
  <p>{{ eleInfo.title }}</p>
</template>
<script lang='ts'>
import { defineComponent, reactive, onMounted } from "vue";
export default defineComponent({
  props: ["item"],
  setup(props) {
    const eleInfo = reactive({
      icon: "",
      title: "",
    });
    function getEleIcon(name: string) {
      switch (name) {
        case "plug-image":
          eleInfo.icon = "fa-picture-o";
          eleInfo.title = "图片";
          break;
        case "plug-button":
          eleInfo.icon = "fa-stop";
          eleInfo.title = props.item.props.text;
          break;
        case "plug-video":
          eleInfo.icon = "fa-file-movie-o";
          eleInfo.title = "视频";
          break;
        case "plug-bg-audio":
          eleInfo.icon = "fa-file-audio-o";
          eleInfo.title = "音乐";
          break;
        default:
          eleInfo.icon = "fa-file-o";
          eleInfo.title = "未识别元素";
          break;
      }
    }
    onMounted(() => {
      getEleIcon(props.item.name);
    });
    return { eleInfo };
  },
});
</script>
<style lang='less' scoped>
</style>