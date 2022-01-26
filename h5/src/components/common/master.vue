<template>
  <el-container>
    <el-header>
      <com-header></com-header>
    </el-header>
    <el-container class="el-container-height">
      <el-aside width="180px">
        <el-menu :default-active="defaultActive" class="el-menu-left" @select="handleSelect">
          <el-menu-item index="/works">
            <el-icon>
              <suitcase />
            </el-icon>
            <template #title>我的作品</template>
          </el-menu-item>
          <el-menu-item index="/formdata">
            <el-icon>
              <data-analysis />
            </el-icon>
            <template #title>我的数据</template>
          </el-menu-item>
          <el-menu-item index="/template">
            <el-icon>
              <document />
            </el-icon>
            <template #title>模版中心</template>
          </el-menu-item>
          <el-menu-item index="/userEdit">
            <el-icon>
              <user />
            </el-icon>
            <template #title>账户管理</template>
          </el-menu-item>
          <el-menu-item index="about">
            <el-icon>
              <postcard />
            </el-icon>
            <template #title>关于微页</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import {
  ElMenu,
  ElMenuItem,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElIcon
} from "element-plus";
import { Postcard, User, Document, Suitcase, DataAnalysis } from '@element-plus/icons-vue'
import comHeader from "@/components/common/comHeader.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  defaultActive: String
})
const handleSelect = (key: any, keyPath: any) => {
  if (key == "about") {
    window.open("https://github.com/chulxun/micropage", "_blank");
  } else {
    router.push(key);
  }
};
</script>

<style lang="less"  scoped>
.el-menu-left {
  height: 100%;
  .iconfont {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
  .el-menu-item.is-active {
    background: var(--lightColor);
  }
}
.el-main {
  background: var(--lightBgColor);
  padding: 0;
}
.el-container-height {
  height: calc(100vh - 60px);
}
</style>