// 视频、音频 资源预览
<template>
  <el-dialog
    :title="type === 2 ? '视频预览' : '音频预览'"
    v-model="previewVisible"
    width="740px"
    :before-close="onClose"
    destroy-on-close
    append-to-body
  >
    <div class="preview_content" v-if="type === 2">
      <video playsinline="true" webkit-playsinline width="700" height="400" controls autoplay>
        <source type="video/mp4" :src="url" />
      </video>
    </div>
    <div class="preview_content" v-else-if="type === 3">
      <audio :src="url" controls></audio>
    </div>
  </el-dialog>
</template>
<script setup lang='ts'>
const props = defineProps({
  type: Number,
  url: String,
  previewVisible: Boolean
})
const emit = defineEmits(['update:visible'])
const onClose = () => {
  emit('update:visible', false)
}
</script>
<style lang='less' scoped>
audio {
  width: 700px;
}
</style>
