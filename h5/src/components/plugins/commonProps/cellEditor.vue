
//cell编辑器
<template>
  <div>
    <el-divider content-position="left">样式</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="背景颜色:">
        <el-color-picker
          v-model="element.style.backgroundColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="文字颜色:">
        <el-color-picker
          v-model="element.style.color"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="圆角:">
        <el-input-number
          v-model.number="element.style.borderRadius"
          :min="0"
          :max="100"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="字号:">
        <el-input-number
          v-model.number="element.style.fontSize"
          :min="8"
          :max="100"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="文字粗细:">
        <el-radio-group v-model="element.style.fontWeight">
          <el-radio-button label="normal">正常</el-radio-button>
          <el-radio-button label="bold">加粗</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文字对齐:">
        <el-radio-group v-model="element.style.textAlign">
          <el-radio-button label="left"
            ><i class="iconfont icon-align-left"></i
          ></el-radio-button>
          <el-radio-button label="center"
            ><i class="iconfont icon-align-center"></i
          ></el-radio-button>
          <el-radio-button label="right"
            ><i class="iconfont icon-align-right"></i
          ></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="边框颜色:">
        <el-color-picker
          v-model="element.style.borderColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="边框宽度:">
        <el-input-number
          v-model.number="element.style.borderWidth"
          :min="0"
          :max="100"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts'>
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElColorPicker,
  ElInputNumber,
  ElRadioGroup,
  ElRadioButton,
  ElDivider,
  ElButton,
} from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
  props: ["element"],
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElColorPicker,
    ElInputNumber,
    ElRadioGroup,
    ElRadioButton,
    ElDivider,
    ElButton,
  },
  setup() {
    return {};
  },
});
</script>
<style lang='less' scoped>
</style>