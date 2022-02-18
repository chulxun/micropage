<template>
  <el-tag size="small" v-if="page_type == 1">长页</el-tag>
  <el-tag size="small" type="success" v-else-if="page_type == 2">多页</el-tag>
  <el-tag size="small" type="warning" v-else-if="page_type == 3">多路由</el-tag>
  <el-tag size="small" type="danger" v-else-if="page_type == 4">定制</el-tag>
</template>

<script setup lang="ts">
defineProps({
  page_type: Number
})
</script>

<style lang="less" scoped>
</style>