<template>
  <div v-if="editingElement">
    <plugEditor :element="editingElement"></plugEditor>
  </div>
  <div v-else>
    <el-empty description="请选择一个元素进行编辑"></el-empty>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store/index";
import plugEditor from "@/components/plugins/editor.vue";
const store = useStore();
const editingElement: any = computed(
  () => store.state.editor.editingElement
);
</script>
<style lang='less' scoped>
</style>