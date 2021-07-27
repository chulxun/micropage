<template>
  <div class="video">
    <!-- 作品预览状态：有source，防止safari播放不兼容 -->
    <video
      v-if="workMode == 'formal'"
      playsinline="true"
      webkit-playsinline=""
      :poster="props.imgUrl"
      :autoplay="props.autoplay"
      :controls="props.controls"
    >
      <source type="video/mp4" :src="props.videoUrl" />
    </video>
    <!-- 编辑状态没有source，防止更换url没反应 -->
    <video
      v-else
      playsinline="true"
      webkit-playsinline=""
      :poster="props.imgUrl"
      :src="props.videoUrl"
    ></video>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["props", "workMode"],
  name: "plug-video",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 240,
      height: 180,
    },
    props: {
      imgUrl: "",
      videoUrl: "",
      autoplay: false,
      controls: true,
    },
  },
  setup(props) {
    return {};
  },
});
</script>
<style lang='less' scoped>
.video {
  video {
    object-fit: cover;
    background-color: #000;
    width: 100%;
    height: 100%;
  }
}
</style>