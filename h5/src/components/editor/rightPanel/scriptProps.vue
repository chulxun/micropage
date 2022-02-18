<template>
  <div>
    <el-empty description="开发中，下个版本见"></el-empty>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const editingElement: any = computed(
  () => store.state.editor.editingElement
);

</script>
<style lang='less' scoped>
</style>