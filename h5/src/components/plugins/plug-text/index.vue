<template>
  <div
    v-html="getElementRichTextRem(element.props.text, workMode === 'formal')"
    :class="{ text: true, editorIng: workMode === 'formal' }"
  ></div>
</template>
<script setup lang="ts">
import { getElementRichTextRem } from "@/utils/element"
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
</script>
<style lang='less' scoped>
.text {
  word-break: break-all;
  &.editorIng * {
    pointer-events: none;
  }
}
</style>