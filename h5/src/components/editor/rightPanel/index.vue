<template>
  <el-aside width="360px" class="editor_right">
    <layers></layers>
    <workSetting></workSetting>
    <el-tabs type="border-card">
      <el-tab-pane label="属性"><pluginProps></pluginProps></el-tab-pane>
      <el-tab-pane label="动画"><animateProps></animateProps></el-tab-pane>
      <el-tab-pane label="页面"><pageProps></pageProps></el-tab-pane>
      <el-tab-pane label="脚本"
        ><scriptProps></scriptProps
      ></el-tab-pane> </el-tabs
  ></el-aside>
</template>
<script lang="ts">
import { ElAside, ElButton, ElTabs, ElTabPane } from "element-plus";
import layers from "./layers/index.vue";
import workSetting from "./workSetting.vue";
import pluginProps from "./pluginProps.vue";
import animateProps from "./animateProps.vue";
import pageProps from "./pageProps.vue";
import scriptProps from "./scriptProps.vue";
export default {
  components: {
    ElAside,
    ElButton,
    ElTabs,
    ElTabPane,
    pluginProps,
    pageProps,
    scriptProps,
    animateProps,
    layers,
    workSetting,
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    onShow() {
      this.drawer = true;
    },
    handleClose() {
      this.drawer = false;
    },
  },
};
</script>
<style lang='less' scoped>
.editor_right {
  background: #fff;
  border-left: 1px solid var(--borderColor);
  position: relative;
  overflow: initial;
  z-index: 11;
}
.el-tabs--border-card {
  height: 100%;
  border: 0;
  :deep(.el-tabs__content) {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }
}
</style>