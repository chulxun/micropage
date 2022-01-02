<template>
  <div class="not_found">
    <div class="title">404</div>
    <p>您要找的页面不存在,请检查输入的网址是否正确。</p>
    <router-link to="/">
      <el-button type="primary" :icon="HomeFilled">返回首页</el-button>
    </router-link>
  </div>
</template>
<script setup lang='ts'>
import { ElButton } from "element-plus";
import { HomeFilled } from '@element-plus/icons-vue'

</script>
<style lang='less' scoped>
.not_found {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .title {
    font-size: 140px;
  }
  p {
    padding: 20px 20px 40px;
    font-size: 18px;
    color: #777;
  }
}
</style>