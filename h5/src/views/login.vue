<template>
  <div class="login_page">
    <div class="login">
      <div class="title">
        <span>微页</span>平台登录
      </div>
      <div class="input_div">
        <el-input
          placeholder="请输入用户名"
          :prefix-icon="User"
          v-model="loginInfo.user_name"
          maxlength="30"
          autocomplete="off"
        ></el-input>
      </div>
      <div class="input_div">
        <el-input
          type="password"
          placeholder="请输入密码"
          :prefix-icon="Lock"
          v-model="loginInfo.password"
          maxlength="18"
          autocomplete="off"
        ></el-input>
      </div>
      <div class="input_div">
        <el-input
          placeholder="请输入验证码"
          :prefix-icon="MagicStick"
          v-model="loginInfo.code"
          maxlength="4"
          autocomplete="off"
        ></el-input>
        <p class="codeimg" id="codeimg"></p>
      </div>
      <el-button type="primary" class="submit_btn" @click="onLogin">登录</el-button>
      <p class="warning">初始化账号：weiye&emsp;&emsp;密码：weiye123456</p>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref, reactive, onMounted, nextTick } from "vue";
import { ElInput, ElButton, ElMessage, ElLoading, ElIcon } from "element-plus";
import { User, Lock, MagicStick } from '@element-plus/icons-vue'
import { login } from "@/api/user";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";
import gVerify from "../utils/gVerify";

const store = useStore();
const router = useRouter();
const codeImg: any = ref('');
const setUserInfo = (userInfo: object) =>
  store.commit("user/setUserInfo", userInfo);
const loginInfo = reactive({
  user_name: "",
  password: "",
  code: "",
});
async function onLogin() {
  if (loginInfo.user_name.length == 0) {
    ElMessage.error("请输入用户名");
  } else if (loginInfo.password.length == 0) {
    ElMessage.error("请输入密码");
  } else if (loginInfo.code.length == 0) {
    ElMessage.error("请输入验证码");
  } else if (codeImg.value.validate(loginInfo.code) == false) {
    ElMessage.error("请输入正确的验证码");
  } else {
    let loading = ElLoading.service({ target: ".login" });
    const res = await login(loginInfo);
    loading.close();
    if (res && res.code == 0) {
      let userInfo = res.property;
      setUserInfo(userInfo);
      ElMessage.success("登录成功");
      router.replace("/");
    } else {
      ElMessage.error(res.message);
    }
  }
}
onMounted(async () => {
  await nextTick();
  codeImg.value = new gVerify({ id: "codeimg" });
});

</script>
<style lang='less' scoped>
.login_page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login {
  background: #fff;
  border-radius: 5px;
  padding: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: var(--primaryColor);
    span {
      border: 1px solid var(--primaryColor);
      border-radius: 0 8px 0 8px;
      padding: 2px 5px;
      margin-right: 10px;
    }
  }
  .input_div {
    margin-top: 20px;
    display: flex;
  }
}
.submit_btn {
  margin-top: 20px;
  width: 100%;
}
.warning {
  text-align: center;
  font-size: 12px;
  padding-top: 15px;
  color: var(--warningColor);
}
.codeimg {
  width: 130px;
  height: 40px;
  background: #666;
  margin-left: 15px;
}
</style>