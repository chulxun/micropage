<template>
  <master defaultActive="/userEdit">
    <div class="user_center">
      <div class="con left">
        <div class="title">修改密码</div>
        <el-form
          :model="pwdInfo"
          status-icon
          ref="pwdRules"
          label-width="85px"
          class="form_one"
          label-position="left"
        >
          <el-form-item
            label="旧密码"
            prop="old_pwd"
            :rules="[
              { required: true, message: '旧密码不能为空' },
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
                message: '密码必须包含字母数字，6-18位之间',
              },
            ]"
          >
            <el-input
              type="password"
              autocomplete="off"
              v-model="pwdInfo.old_pwd"
              maxlength="18"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="pwd"
            :rules="[
              { required: true, message: '新密码不能为空' },
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
                message: '密码必须包含字母数字，6-18位之间',
              },
              {
                validator: validatePwd,
              },
            ]"
          >
            <el-input
              type="password"
              v-model="pwdInfo.pwd"
              autocomplete="off"
              maxlength="18"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="pwd2"
            :rules="[
              { required: true, message: '确认密码不能为空' },
              {
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
                message: '密码必须包含字母数字，6-18位之间',
              },
              {
                type: 'string',
                validator: validatePwd,
                trigger: 'blur',
              },
            ]"
          >
            <el-input
              type="password"
              v-model="pwdInfo.pwd2"
              autocomplete="off"
              maxlength="18"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitPwd('pwdRules')"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="con right">
        <div class="title">修改个人信息</div>
        <el-form
          :model="editInfo"
          status-icon
          ref="editRules"
          label-width="85px"
          class="form_one"
          label-position="left"
        >
          <el-form-item
            label="用户名"
            prop="user_name"
            :rules="[{ required: true, message: '用户名不能为空' }]"
          >
            <el-input
              v-model="editInfo.user_name"
              autocomplete="off"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
            :rules="[
              { required: true, message: '邮箱不能为空' },
              { type: 'email', message: '邮箱格式不正确' },
            ]"
          >
            <el-input
              type="email"
              v-model="editInfo.email"
              autocomplete="off"
              maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="mobile"
            :rules="[
              { required: true, message: '手机号不能为空' },
              {
                pattern: /^1(1|2|3|4|5|6|7|8|9|0)\d{9}$/,
                message: '手机号格式不正确',
              },
            ]"
          >
            <el-input
              maxlength="11"
              v-model="editInfo.mobile"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitEdit('editRules')"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </master>
</template>
<script lang="ts">
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElLoading,
  ElMessage,
} from "element-plus";
import master from "@/components/common/master.vue";
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "@/store/index";
import { useRouter } from "vue-router";
import { changePwd, editUserInfo } from "@/api/user";
export default defineComponent({
  components: {
    master,
    ElButton,
    ElForm,
    ElFormItem,
    ElInput,
    ElLoading,
    ElMessage,
  },
  methods: {},
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    const userInfo = computed(() => store.state.user.userInfo);
    const delUserInfo = () => store.commit("user/delUserInfo");
    const setUserInfo = (userInfo: object) =>
      store.commit("user/setUserInfo", userInfo);
    const editInfo = reactive({
      user_name: userInfo.value.user_name || "",
      email: userInfo.value.email || "",
      mobile: userInfo.value.mobile || "",
    });
    const pwdInfo = reactive({
      old_pwd: "",
      pwd: "",
      pwd2: "",
    });
    const pwdRules = ref(null);
    var validatePwd = (rule, value, callback) => {
      if (pwdInfo.pwd !== pwdInfo.pwd2) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //修改密码
    function submitPwd(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (userInfo.value.id == 1) {
            return ElMessage.error("该账号为测试账号，不能修改信息");
          }
          let loading = ElLoading.service({ target: ".con.left" });
          const res = await changePwd({
            old_pwd: pwdInfo.old_pwd,
            password: pwdInfo.pwd,
          });
          loading.close();
          if (res && res.code == 0) {
            delUserInfo();
            ElMessage.success("密码修改成功，您需要重新登录");
            router.replace("/login");
          } else {
            ElMessage.error(res.message);
          }
        } else {
          return false;
        }
      });
    }
    //修改个人信息
    function submitEdit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (userInfo.value.id == 1) {
            return ElMessage.error("该账号为测试账号，不能修改信息");
          }
          let loading = ElLoading.service({ target: ".con.right" });
          const res = await editUserInfo(editInfo);
          loading.close();
          if (res && res.code == 0) {
            const newUserInfo = { ...userInfo.value };
            newUserInfo.user_name = editInfo.user_name;
            newUserInfo.email = editInfo.email;
            newUserInfo.mobile = editInfo.mobile;
            setUserInfo(newUserInfo);
            ElMessage.success("用户信息修改成功");
          } else {
            ElMessage.error(res.message);
          }
        } else {
          return false;
        }
      });
    }
    return {
      pwdInfo,
      validatePwd,
      editInfo,
      submitPwd,
      submitEdit,
      pwdRules,
    };
  },
});
</script>
<style lang="less"  scoped>
.user_center {
  margin: 20px;
  background: #fff;
  min-height: calc(100% - 40px);
  border-radius: 5px;
  display: flex;
  padding: 50px 0;
  .con {
    flex: 1;
    padding: 0 7%;
  }
  .left {
    border-right: 1px solid var(--borderColor);
  }
  .title {
    font-weight: bold;
    font-size: 20px;
    padding: 20px 0 30px;
  }
  .el-form-item {
    margin-bottom: 22px;
  }
  .form_one {
    max-width: 400px;
  }
}
</style>