<template>
  <div>
    <el-empty description="开发中，下个版本见"></el-empty>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from "vue";
import { ElEmpty, ElForm, ElFormItem, ElInput } from "element-plus";
import { useStore } from "@/store/index";

const store = useStore();
const editingElement: any = computed(
  () => store.state.editor.editingElement
);

</script>
<style lang='less' scoped>
</style>