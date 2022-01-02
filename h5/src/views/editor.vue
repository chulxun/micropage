<template>
  <el-container v-if="work.work_id">
    <el-header>
      <com-header>
        <topPanel :workId="workId"></topPanel>
      </com-header>
    </el-header>
    <el-container class="main_container">
      <leftPanel></leftPanel>
      <el-main>
        <mainPanel></mainPanel>
      </el-main>
      <rightPanel></rightPanel>
    </el-container>
  </el-container>
  <div v-else-if="isLoading" class="loading">
    <el-icon>
      <loading />
    </el-icon>作品获取中...
  </div>
  <el-empty v-else description="抱歉，您要编辑的作品不存在或无权限">
    <el-button type="primary" @click="goWorks">查看我的作品</el-button>
  </el-empty>
</template>
<script lang="ts">
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElButton,
  ElLoading,
  ElEmpty, ElIcon,
} from "element-plus";
import comHeader from "@/components/common/comHeader.vue";
import topPanel from "@/components/editor/topPanel/index.vue";
import leftPanel from "@/components/editor/leftPanel/index.vue";
import rightPanel from "@/components/editor/rightPanel/index.vue";
import mainPanel from "@/components/editor/mainPanel/index.vue";
import { useStore } from "../store/index";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Loading } from '@element-plus/icons-vue'
export default {
  props: ["workId"],
  components: {
    comHeader,
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
    ElButton,
    leftPanel,
    rightPanel,
    mainPanel,
    topPanel,
    ElEmpty, ElIcon, Loading
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(true);
    const setOperaType = (type: any) =>
      store.commit("common/setOperaType", type);
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
    fetchWorkInfo();
    //去查看我的作品
    function goWorks() {
      router.replace("/works");
    }

    return { work, goWorks, isLoading };
  },
  mounted() {
    setTimeout(() => {
      window.onbeforeunload = (e) => {
        return "";
      };
    }, 0);
  },
  beforeDestory() {
    window.onbeforeunload = null;
  },
};
</script>
<style lang="less"  scoped>
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