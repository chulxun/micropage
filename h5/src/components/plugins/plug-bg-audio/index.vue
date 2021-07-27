<template>
  <div
    :class="{ 'bg-music-btn': true, rotate: true, playing: isPlaying }"
    @click="togglePlay"
  >
    <audio
      :src="props.audioUrl"
      :autoplay="props.autoplay && workMode == 'formal'"
      preload
      loop
      ref="bgAudio"
    ></audio>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: ["props", "workMode"],
  name: "plug-bg-audio",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 32,
      height: 32,
      left: 333,
      top: 10,
    },
    props: {
      audioUrl: "",
      autoplay: false,
    },
  },
  setup(props) {
    const bgAudio = ref(null);
    const isPlaying = ref(false);
    function togglePlay() {
      if (props.workMode == "editor") return;
      let bgAudio = this.$refs.bgAudio;
      if (!bgAudio) return;
      if (isPlaying.value) {
        bgAudio.pause();
      } else {
        bgAudio.play();
      }
      isPlaying.value = !isPlaying.value;
    }
    return { bgAudio, isPlaying, togglePlay };
  },
});
</script>
<style lang='less' scoped>
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

.bg-music-btn {
  border-radius: 15px;
  background: url("https://public.fanjinyan.com/weiye_bg_music.svg") no-repeat
    center center;
  background-size: contain;

  &.rotate {
    animation: rotating 1.2s linear infinite;
    animation-play-state: paused;
    &.playing {
      animation-play-state: running;
    }
  }
}
</style>