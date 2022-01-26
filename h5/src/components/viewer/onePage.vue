<template>
  <div
    v-for="item in page.elements"
    :key="item.ukey"
    :style="getElementStyle(item.style, true, pageHeight)"
  >
    <animation :element="item" v-if="!item.props.hide">
      <element :element="item"></element>
    </animation>
  </div>
</template>

<script setup lang="ts">
import animation from "./animation.vue";
import element from "@/components/plugins/element.vue";
import { getElementStyle } from "@/utils/element";
defineProps({
  page: Object,
  pageHeight: Number
})
</script>

<style lang="less" scoped>
</style>