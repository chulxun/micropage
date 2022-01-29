<template>
  <div
    :class="{ 'bg-music-btn': true, rotate: true, playing: isPlaying }"
    @click="togglePlay"
    :style="bgStyle"
  >
    <audio
      :src="element.props.audioUrl"
      :autoplay="element.props.autoplay && workMode == 'formal'"
      preload="preload"
      loop
      ref="bgAudio"
    ></audio>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const bgAudio: any = ref(null);
const isPlaying = ref(false);
const bgStyle = computed(() => {
  if (props.element.props.playIcon && isPlaying.value === true) {
    return { backgroundImage: 'url(' + props.element.props.playIcon + ')' }
  } else if (props.element.props.pauseIcon && isPlaying.value === false) {
    return { backgroundImage: 'url(' + props.element.props.pauseIcon + ')' }
  } else {
    return {}
  }
})
function togglePlay() {
  if (props.workMode == "editor") return;
  if (!bgAudio.value) return;
  if (isPlaying.value) {
    bgAudio.value.pause();
  } else {
    bgAudio.value.play();
  }
  isPlaying.value = !isPlaying.value;
}
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
  background: url("/images/weiye_bg_music.svg") no-repeat center center;
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