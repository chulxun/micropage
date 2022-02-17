<template>
  <div class="editor">
    <div class="editor_container">
      <component :is="curRouter.component"></component>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const curRouter = computed(() => store.state.custom.curRouter)

</script>
<style lang='less' scoped>
// 复用 /components/editor/mainPanel/index.vue 样式
.editor_container {
  display: grid;
  transform: scale(1);
  height: auto;
  min-height: 667px;
  background: #fff;
}
</style>