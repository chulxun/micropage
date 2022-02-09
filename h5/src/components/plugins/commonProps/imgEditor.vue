
//图片、视频、音频编辑器
<template>
  <template v-if="imgUrl">
    <div>
      <ElImage class="img" :src="imgUrl" fit="cover" :preview-src-list="[imgUrl]" v-if="type == 1"></ElImage>
      <div v-else-if="type == 2">
        <video @click="previewVideo" preload="preload" ref="video" :src="imgUrl"></video>
        <videoPreview
          v-model:url="imgUrl"
          v-model:previewVisible="previewVisible"
          :type="type"
          v-if="previewVisible"
        ></videoPreview>
      </div>

      <div
        :class="{
          'uploader-icon': true,
          'music-icon': true,
        }"
        v-else-if="type == 3"
        @click="togglePlay"
      >
        <audio ref="audio" :src="imgUrl"></audio>
        <el-icon>
          <VideoPause v-if="audioPlaying" />
          <VideoPlay v-else />
        </el-icon>
      </div>
    </div>
    <div>
      <ElButton size="small" @click="onShowSourceList">更换</ElButton>
      <ElButton size="small" @click="onRemove">移除</ElButton>
    </div>
  </template>
  <div v-else>
    <el-icon class="uploader-icon" @click="onShowSourceList">
      <plus />
    </el-icon>
  </div>
  <gallery v-model:visible="gelleryVisible" :type="type" @onChange="onChange" />
</template>
<script setup lang='ts'>
import { ElImage, ElButton, ElIcon } from "element-plus";
import { ref, onMounted, nextTick } from "vue";
import { useStore } from "@/store/index";
import videoPreview from "@/components/support/resource/preview.vue";
import { Plus, VideoPause, VideoPlay } from '@element-plus/icons-vue'
import gallery from '@/components/support/resource/gallery.vue'

const props = defineProps({
  imgUrl: {
    default: "",
    type: String,
  },
  type: {
    type: Number,
    default: 1, // 1图片 2视频 3音乐
  },
})
const emit = defineEmits(['update:imgUrl'])
const store = useStore();
function onRemove() {
  emit("update:imgUrl", "");
}
const video = ref(null);
const gelleryVisible = ref(false)
function onShowSourceList() {
  gelleryVisible.value = true
}
const audio: any = ref(null);
const audioPlaying = ref(false);
onMounted(async () => {
  await nextTick();
  if (audio.value) {
    audio.value.addEventListener("playing", function () {
      audioPlaying.value = true;
    });
    audio.value.addEventListener("pause", function () {
      audioPlaying.value = false;
    });
  }
});
// 更换资源
function onChange(val: string) {
  emit("update:imgUrl", val);
}
//播放音乐
function togglePlay() {
  if (!props.imgUrl) return;
  if (audioPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
}
//预览视频
const previewVisible = ref(false);
function previewVideo() {
  previewVisible.value = true;
}
</script>
<style lang='less' scoped>
.img,
video,
.uploader-icon {
  width: 120px;
  height: 120px;
  border-radius: 3px;
  border: 1px dashed #dcdcdc;
  display: block;
  margin-bottom: 6px;
}
.uploader-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
}
.music-icon {
  font-size: 40px;
  color: #555;
}
</style>