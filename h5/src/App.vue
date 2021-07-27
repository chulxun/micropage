<template>
  <router-view></router-view>
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style lang="less">
@import "./css/reset.less";
// element plus 样式重置
.el-header {
  background: var(--bgColor);
  color: #fff;
  display: flex;
  align-items: center;
}
.el-container.is-vertical {
  height: 100vh;
}
.el-form {
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .el-form-item {
    margin-bottom: 15px;
  }
  .el-form--label-top .el-form-item {
    margin-bottom: 10px;
  }
}
.el-divider {
  &.el-divider--horizontal {
    margin: 28px 0;
  }
  .el-divider__text {
    font-size: 18px;
  }
}
</style>