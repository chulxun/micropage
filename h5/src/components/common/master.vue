<template>
  <el-container>
    <el-header><com-header></com-header></el-header>
    <el-container class="el-container-height">
      <el-aside width="180px">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-left"
          @select="handleSelect"
          :router="true"
        >
          <el-menu-item index="/works">
            <i class="el-icon-suitcase"></i>
            <template #title>我的作品</template>
          </el-menu-item>
          <el-menu-item index="/formdata">
            <i class="el-icon-data-analysis"></i>
            <template #title>我的数据</template>
          </el-menu-item>
          <el-menu-item index="/template">
            <i class="el-icon-document"></i>
            <template #title>模版中心</template>
          </el-menu-item>
          <el-menu-item index="/userEdit">
            <i class="el-icon-user"></i>
            <template #title>账户管理</template>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-postcard"></i>
            <template #title>关于微页</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><slot></slot> </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import {
  ElMenu,
  ElMenuItem,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElButton,
} from "element-plus";
import comHeader from "@/components/common/comHeader.vue";
import { defineComponent } from "vue";
export default defineComponent({
  props: ["defaultActive"],
  components: {
    comHeader,
    ElMenu,
    ElMenuItem,
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
    ElButton,
  },
  setup() {
    const handleSelect = (key: any, keyPath: any) => {
      // console.log(key, keyPath);
    };
    return {
      handleSelect,
    };
  },
});
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