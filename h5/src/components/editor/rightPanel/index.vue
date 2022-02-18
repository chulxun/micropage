<template>
  <el-aside width="360px" class="editor_right">
    <layers></layers>
    <workSetting></workSetting>
    <el-tabs type="border-card" v-model="tabIndex">
      <el-tab-pane label="属性" name="props">
        <pluginProps></pluginProps>
      </el-tab-pane>
      <el-tab-pane label="动画" name="animation">
        <animateProps></animateProps>
      </el-tab-pane>
      <el-tab-pane label="页面" name="page">
        <pageProps></pageProps>
      </el-tab-pane>
      <el-tab-pane label="脚本" name="script">
        <scriptProps></scriptProps>
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>
<script setup lang="ts">
import layers from "./layers/index.vue";
import workSetting from "./workSetting.vue";
import pluginProps from "./pluginProps.vue";
import animateProps from "./animateProps.vue";
import pageProps from "./pageProps.vue";
import scriptProps from "./scriptProps.vue";
import { ref } from "vue";
const tabIndex = ref("props");

</script>
<style lang='less'>
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
  .el-tabs__content {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    //编辑器的公共属性：多次复用的样式
    .el-form-item__label {
      white-space: nowrap;
    }
    .tips {
      font-size: 12px;
      color: #888;
      line-height: 1.2;
      padding-top: 10px;
    }
    .el-input__prefix-inner,
    .el-input__suffix-inner {
      align-items: center;
    }
  }
}

.animation_drawer {
  .el-drawer__header {
    margin-bottom: 0;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  .el-drawer__body {
    padding: 10px 20px;
  }
}
</style>