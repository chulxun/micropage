<template>
  <div class="video">
    <!-- 作品预览状态：有source，防止safari播放不兼容 -->
    <video
      v-if="workMode == 'formal'"
      playsinline="true"
      webkit-playsinline
      :poster="element.props.imgUrl"
      :autoplay="element.props.autoplay"
      :controls="element.props.controls"
    >
      <source type="video/mp4" :src="element.props.videoUrl" />
    </video>
    <!-- 编辑状态没有source，防止更换url没反应 -->
    <video
      v-else
      playsinline="true"
      webkit-playsinline
      :poster="element.props.imgUrl"
      :src="element.props.videoUrl"
    ></video>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
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