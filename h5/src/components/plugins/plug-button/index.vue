<template>
  <button class="plug-btn">{{ element.props.text }}</button>
</template>
<script setup lang="ts">
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
</script>
<style lang='less' scoped>
</style>