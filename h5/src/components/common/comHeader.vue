<template>
  <div class="header">
    <div class="logo" v-bind="{ id: 'logo' }">
      <b>微页</b>
      <span>H5编辑器</span>
    </div>
    <slot></slot>
    <div class="user_info">
      <i
        @click="handleCommand('github')"
        class="iconfont icon-github"
        style="font-size: 24px;cursor:pointer"
      ></i>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.user_name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="/works">我的作品</el-dropdown-item>
            <el-dropdown-item command="/formdata">数据中心</el-dropdown-item>
            <el-dropdown-item command="/userEdit">账号管理</el-dropdown-item>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from "element-plus";
import { useStore } from "@/store/index";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import { ArrowDown } from '@element-plus/icons-vue'

const store = useStore();
const router = useRouter();
const route = useRoute();
const userInfo = computed(() => store.state.user.userInfo);
const delUserInfo = () => store.commit("user/delUserInfo");

const handleCommand = (command: string) => {
  if (command == "github") {
    window.open("https://github.com/chulxun/micropage", "_blank");
  } else if (command == "loginout") {
    //退出登录
    delUserInfo();
    router.push("/login");
  } else {
    let routeName = route.name;
    if (routeName == "Editor") {
      window.open(command, "_blank");
    } else {
      router.push(command);
    }
  }
}


</script>
<style lang='less' scoped>
.header {
  justify-content: space-between;
  display: flex;
  flex: 1;
  align-items: center;
}
.logo {
  font-size: 26px;
  font-weight: bold;
  b {
    border: 1px solid #fff;
    border-radius: 0 8px 0 8px;
    padding: 2px 5px;
  }
  span {
    font-size: 12px;
    padding: 0 10px;
  }
}
.el-menu-item:hover {
  background-color: #202e3c !important;
}
.user_info {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: 30px;
  > div {
    padding: 0 15px;
  }
  :deep(.el-dropdown-link) {
    color: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>