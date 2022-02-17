<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

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
  .el-form-item__label,
  .el-form-item__content {
    line-height: 30px !important;
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