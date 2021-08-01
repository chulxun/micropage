<template>
  <div :class="{ layer_container: true, open: show }">
    <el-tooltip content="作品设置" placement="left">
      <div class="layer_icon" v-show="!show" @click="toggleShow">
        <i class="el-icon-setting"></i>
        <p>设置</p>
      </div>
    </el-tooltip>
    <div class="container" v-show="show">
      <div class="title">
        <p>作品设置</p>
        <i class="el-icon-d-arrow-right" @click="toggleShow"></i>
      </div>
      <div class="form_content">
        <el-form ref="form" :model="work" label-position="top" size="small">
          <el-form-item label="作品标题">
            <el-input v-model="work.title" maxlength="50"></el-input>
          </el-form-item>

          <el-form-item label="作品描述">
            <el-input
              type="textarea"
              v-model="work.description"
              maxlength="200"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElColorPicker,
  ElTooltip,
} from "element-plus";
import { reactive, ref, defineComponent, computed } from "vue";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElColorPicker,
    ElTooltip,
  },
  setup(props) {
    let show = ref(false);
    function toggleShow() {
      show.value = !show.value;
    }
    const store = useStore();
    return { work: computed(() => store.state.editor.work), show, toggleShow };
  },
  mounted() {},
});
</script>
<style lang='less' scoped>
.layer_container {
  left: 0;
  top: 40px;
  position: absolute;
  transform: translateX(-100%);
  &.open {
    top: 0;
    z-index: 2;
  }
}
.layer_icon {
  width: 70px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid var(--borderColor);
  p {
    margin-left: 6px;
  }
}
.container {
  height: calc(100vh - 60px);
  width: 300px;
  background: #fff;
  border: 1px solid var(--borderColor);
  user-select: none;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px 0 15px;
    height: 40px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    i {
      padding: 10px;
      cursor: pointer;
    }
  }
}
.form_content {
  padding: 10px 16px;
}
</style>