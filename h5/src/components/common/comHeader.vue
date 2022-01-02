<template>
  <div class="header">
    <div class="logo" v-bind="{ id: 'logo' }">
      <b>微页</b>
      <span>H5编辑器</span>
    </div>
    <slot></slot>
    <div class="user_info">
      <el-menu
        mode="horizontal"
        @select="handleSelect"
        background-color="var(--bgColor)"
        text-color="#fff"
        active-text-color="#ff"
      >
        <el-menu-item index="github">
          <i class="iconfont icon-github" style="font-size: 24px"></i>
        </el-menu-item>
        <el-sub-menu index="2" v-if="userInfo.token">
          <template #title>{{ userInfo.user_name }}</template>
          <el-menu-item index="/works">我的作品</el-menu-item>
          <el-menu-item index="/formdata">数据中心</el-menu-item>
          <el-menu-item index="/userEdit">账号管理</el-menu-item>
          <el-menu-item index="loginout">退出登录</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>
<script lang="ts">
import { ElHeader, ElMenu, ElMenuItem, ElSubMenu } from "element-plus";
import { useStore } from "@/store/index";
import { useRouter, useRoute } from "vue-router";
import { defineComponent, computed } from "vue";
export default defineComponent({
  components: {
    ElHeader,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const userInfo = computed(() => store.state.user.userInfo);
    const delUserInfo = () => store.commit("user/delUserInfo");
    function handleSelect(index: string) {
      if (index == "github") {
        window.open("https://github.com/chulxun/micropage", "_blank");
      } else if (index == "loginout") {
        //退出登录
        delUserInfo();
        router.push("/login");
      } else {
        let routeName = route.name;
        if (routeName == "Editor") {
          window.open(index, "_blank");
        } else {
          router.push(index);
        }
      }
    }
    return { userInfo, handleSelect };
  },
  methods: {},
});
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
</style>