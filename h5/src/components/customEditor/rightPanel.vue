<template>
  <el-aside width="360px" class="editor_right">
    <el-tabs type="border-card" v-if="curRouter.editor.length > 0">
      <el-tab-pane :label="item.tabName" v-for="(item, index) in curRouter.editor" :key="index">
        <component :is="item.component"></component>
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const config = computed(() => store.state.editor.config)
const curRouter = computed(() => store.state.custom.curRouter)

</script>
<style lang='less' scoped>
// 复用 /components/editor/rightPanel/index.vue 样式
</style>
