<template>
  <template v-if="work.work_id">
    <CustomEditor v-if="work.page_type === 4" :workId="workId"></CustomEditor>
    <Editor v-else :workId="workId"></Editor>
  </template>
  <div v-else-if="isLoading" class="loading">
    <el-icon>
      <loading />
    </el-icon>作品获取中...
  </div>
  <el-empty v-else description="抱歉，您要编辑的作品不存在或无权限">
    <el-button type="primary" @click="goWorks">查看我的作品</el-button>
  </el-empty>
</template>
<script setup lang="ts">
import { ElContainer, ElHeader, ElMain, ElButton, ElLoading, ElEmpty, ElIcon, } from "element-plus";
import Editor from "@/components/editor/index.vue";
import CustomEditor from "@/components/customEditor/index.vue";
import { useStore } from "../store/index";
import { onMounted, computed, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Loading } from '@element-plus/icons-vue'
const props = defineProps({
  workId: String
})
const store = useStore();
const router = useRouter();
const isLoading = ref(true);
const setWorkInfo = (payload: any) =>
  store.dispatch("editor/setWorkInfo", payload);
const work = computed(() => store.state.editor.work);
//获取作品详情
async function fetchWorkInfo() {
  isLoading.value = true;
  let loading = ElLoading.service({ fullscreen: true });
  await setWorkInfo({ workId: props.workId });
  loading.close();
  isLoading.value = false;
}
//去查看我的作品
function goWorks() {
  router.replace("/works");
}
onMounted(() => {
  fetchWorkInfo();
  setTimeout(() => {
    window.onbeforeunload = (e) => {
      return "";
    };
  }, 0);
})
onUnmounted(() => {
  window.onbeforeunload = null;
})
</script>
<style lang="less" >
.main_container {
  background: var(--lightBgColor);
}
.el-main {
  position: relative;
}
.loading {
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
</style>