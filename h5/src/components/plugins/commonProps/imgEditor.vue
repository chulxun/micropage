
//图片编辑器
<template>
  <template v-if="imgUrl">
    <div>
      <ElImage
        class="img"
        :src="imgUrl"
        fit="cover"
        :preview-src-list="[imgUrl]"
        v-if="sourceType == 1"
      ></ElImage>
      <div v-else-if="sourceType == 2">
        <video @click="previewVideo" preload="preload" ref="video" :src="imgUrl"></video>
        <videoPreview
          v-model:videoUrl="imgUrl"
          v-model:previewVisible="previewVisible"
          v-if="previewVisible"
        ></videoPreview>
      </div>

      <div
        :class="{
          'el-icon-video-pause': audioPlaying,
          'el-icon-video-play': !audioPlaying,
          'uploader-icon': true,
          'music-icon': true,
        }"
        v-else-if="sourceType == 3"
        @click="togglePlay"
      >
        <audio ref="audio" :src="imgUrl"></audio>
      </div>
    </div>
    <ElButton size="mini" @click="onShowSourceList">更换</ElButton>
    <ElButton size="mini" @click="onRemove">移除</ElButton>
  </template>
  <div v-else>
    <el-icon class="uploader-icon" @click="onShowSourceList">
      <plus />
    </el-icon>
  </div>
</template>
<script lang='ts'>
import { ElImage, ElButton, ElIcon } from "element-plus";
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { useStore } from "@/store/index";
import videoPreview from "@/components/common/videoPreview.vue";
import { Plus } from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    imgUrl: {
      default: "",
      type: String,
    },
    sourceType: {
      type: Number,
      default: 1, // 1图片 2视频 3音乐
    },
  },
  components: {
    ElImage,
    ElButton,
    videoPreview, ElIcon, Plus
  },
  setup(props, ctx) {
    const store = useStore();
    const setOperaType = (type: any) =>
      store.commit("common/setOperaType", type);
    const setChangeSourceType = (type: any) =>
      store.commit("common/setChangeSourceType", type);
    function onRemove() {
      ctx.emit("update:imgUrl", "");
    }
    const video = ref(null);
    function onShowSourceList() {
      setOperaType(4);
      setChangeSourceType(props.sourceType);
    }
    const audio = ref(null);
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
    return {
      previewVideo,
      previewVisible,
      onShowSourceList,
      onRemove,
      togglePlay,
      audio,
      audioPlaying,
      video,
    };
  },
});
</script>
<style lang='less' scoped>
.img,
video,
.uploader-icon {
  width: 120px;
  height: 120px;
  border-radius: 3px;
  border: 1px dashed #dcdcdc;
}
.uploader-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.music-icon {
  font-size: 40px;
  color: #555;
}
</style>