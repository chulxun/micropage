<template>
  <el-dialog
    :title="videoUrl ? '视频预览' : '音频预览'"
    v-model="previewShow"
    width="740px"
    destroy-on-close
    append-to-body
  >
    <div class="preview_content" v-if="videoUrl">
      <video playsinline="true" webkit-playsinline width="700" height="400" controls autoplay>
        <source type="video/mp4" :src="videoUrl" />
      </video>
    </div>
    <div class="preview_content" v-else-if="audioUrl">
      <audio :src="audioUrl" controls></audio>
    </div>
  </el-dialog>
</template>
<script setup lang='ts'>
import { ref, watch } from "vue";
import { ElButton, ElDialog } from "element-plus";

const props = defineProps({
  videoUrl: String,
  audioUrl: String,
  previewVisible: Boolean
})
const emit = defineEmits(['update:previewVisible'])
const previewShow = ref(props.previewVisible);
watch(previewShow, (val, oldval) => {
  emit("update:previewVisible", val);
});
</script>
<style lang='less' scoped>
audio {
  width: 700px;
}
</style>
