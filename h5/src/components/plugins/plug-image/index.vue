<template>
  <img :src="element.props.imgUrl" />
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
}
</style>