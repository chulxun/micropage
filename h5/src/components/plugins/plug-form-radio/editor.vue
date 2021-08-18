<template>
  <div>
    <el-divider content-position="left">样式</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="标题颜色:">
        <el-color-picker
          v-model="element.style.color"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="options颜色:">
        <el-color-picker
          v-model="element.props.color"
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
      <el-form-item label="排列方式:">
        <el-radio-group v-model="element.props.direction">
          <el-radio-button label="vertical">上下</el-radio-button>
          <el-radio-button label="horizontal">水平</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="形状:">
        <el-radio-group v-model="element.props.shape">
          <el-radio-button label="round">圆形</el-radio-button>
          <el-radio-button label="square">方形</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选中颜色:">
        <el-color-picker
          v-model="element.props.checkedColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="标题:" required>
        <el-input v-model="element.props.name" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="显示标题:">
        <el-switch v-model="element.props.showTitle"></el-switch>
      </el-form-item>
      <el-form-item label="必填:">
        <el-switch v-model="element.props.required"></el-switch>
      </el-form-item>
    </el-form>
    <optionsEditor :element="element"></optionsEditor>
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
  ElDivider,
  ElRadioGroup,
  ElRadioButton,
  ElSelect,
  ElOption,
  ElSwitch,
} from "element-plus";
import optionsEditor from "../commonProps/optionsEditor.vue";
export default defineComponent({
  components: {
    ElForm,
    ElColorPicker,
    ElInputNumber,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    ElRadioGroup,
    ElRadioButton,
    ElSelect,
    ElOption,
    ElSwitch,
    optionsEditor,
  },
  props: ["element"],
  setup(props, ctx) {
    return {};
  },
});
</script>
<style lang='less' scoped>
</style>