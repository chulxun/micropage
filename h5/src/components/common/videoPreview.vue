<template>
  <el-dialog
    :title="videoUrl ? '视频预览' : '音频预览'"
    v-model="previewShow"
    width="740px"
    destroy-on-close
    append-to-body
  >
    <div class="preview_content" v-if="videoUrl">
      <video
        playsinline="true"
        webkit-playsinline=""
        width="700"
        height="400"
        controls
        autoplay
      >
        <source type="video/mp4" :src="videoUrl" />
      </video>
    </div>
    <div class="preview_content" v-else-if="audioUrl">
      <audio :src="audioUrl" controls></audio>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import { ElButton, ElDialog } from "element-plus";

export default defineComponent({
  props: ["videoUrl", "audioUrl", "previewVisible"],
  components: { ElButton, ElDialog },
  setup(props, ctx) {
    const previewShow = ref(props.previewVisible);
    watch(previewShow, (val, oldval) => {
      ctx.emit("update:previewVisible", val);
    });
    return { previewShow };
  },
});
</script>
<style lang='less' scoped>
audio {
  width: 700px;
}
</style>
