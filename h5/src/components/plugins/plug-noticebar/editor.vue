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
    </el-form>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="文案:" required>
        <el-input
          type="textarea"
          :rows="4"
          v-model="element.props.text"
          maxlength="1000"
        ></el-input>
      </el-form-item>
      <el-form-item label="左图标:">
        <iconEditor v-model:iconUrl="element.props.icon"></iconEditor>
      </el-form-item>
      <el-form-item label="展示类型:">
        <el-radio-group v-model="element.props.type">
          <el-radio-button label="scrollable">单行滚动</el-radio-button>
          <el-radio-button label="wrapable">多行展示</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="模式:">
        <el-radio-group v-model="element.props.mode">
          <el-radio-button label="">无</el-radio-button>
          <el-radio-button label="closeable">可关闭</el-radio-button>
          <el-radio-button label="link">右侧箭头</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <clickEditor :element="element"></clickEditor>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  ElForm,
  ElFormItem,
  ElColorPicker,
  ElInputNumber,
  ElInput,
  ElButton,
  ElSwitch,
  ElDivider,
  ElRadioGroup,
  ElRadioButton,
} from "element-plus";
import iconEditor from "../commonProps/iconEditor.vue";
import clickEditor from "../commonProps/clickEditor.vue";
export default defineComponent({
  components: {
    ElForm,
    ElColorPicker,
    ElInputNumber,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    ElSwitch,
    ElRadioGroup,
    ElRadioButton,
    iconEditor,
    clickEditor,
  },
  props: ["element"],
  setup(props, ctx) {
    return {};
  },
});
</script>
<style lang='less' scoped>
</style>