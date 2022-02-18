<template>
  <el-aside width="150px" class="custom_editor_left">
    <div class="routers">
      <div
        v-for="(item, index) in routers"
        :key="index"
        :class="{ cur: item.title === curRouter?.title }"
        @click="setCurRouter(item)"
      >{{ item.title }}</div>
    </div>
  </el-aside>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store/index";
import { customRouters } from '@/custom/list'

const store = useStore();
const config = computed(() => store.state.editor.config)
const curRouter = computed(() => store.state.custom.curRouter)
const setCurRouter = (router: any) => store.commit('custom/setCurRouter', router)
const routers = computed(() => {
  if (config.value.name) {
    const cusRouters = customRouters[config.value.name] || []
    setCurRouter(cusRouters[0])
    return cusRouters
  } else {
    return []
  }
})
</script>
<style lang='less' scoped>
.custom_editor_left {
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #333;
  .routers {
    flex: 1;
    padding: 20px 15px;
    > div {
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
      border-bottom: 1px dashed var(--borderColor);
      font-size: 14px;
      &:hover,
      &.cur {
        color: var(--primaryColor);
      }
    }
  }
}
</style>