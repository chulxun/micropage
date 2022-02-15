<template>
  <img :src="element.props.imgUrl" :style="{ objectFit: element.props.objectFit }" />
</template>
<script setup lang="ts">
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
</script>
<style lang='less' scoped>
img {
  object-fit: cover;
  height: 100%;
}
</style>