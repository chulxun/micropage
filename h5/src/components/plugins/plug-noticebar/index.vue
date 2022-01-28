<template>
  <NoticeBar
    :scrollable="element.props.type == 'scrollable'"
    :wrapable="element.props.type == 'wrapable'"
    :left-icon="element.props.icon"
    :mode="element.props.mode"
    background="transparent"
  >{{ element.props.text }}</NoticeBar>
</template>
<script setup lang="ts">
import { NoticeBar } from "vant";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
</script>
<style lang='less' scoped>
:deep(.van-notice-bar__wrap) {
  background-color: transparent;
}
:deep(.van-notice-bar__content) {
  color: inherit;
}
</style>