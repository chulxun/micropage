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
      <el-form-item label="标题字号:">
        <el-input-number
          v-model.number="element.style.fontSize"
          :min="8"
          :max="100"
          :step="1"
          label="px"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="标题粗细:">
        <el-radio-group v-model="element.style.fontWeight">
          <el-radio-button label="normal">正常</el-radio-button>
          <el-radio-button label="bold">加粗</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标大小:">
        <el-input-number
          v-model.number="element.props.size"
          :min="1"
          :max="100"
          :step="1"
          controls-position="right"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="未选图标:" required>
        <iconEditor
          v-model:iconUrl="element.props.voidIcon"
          :color="element.props.voidColor"
        ></iconEditor>
      </el-form-item>
      <el-form-item label="选中图标:" required>
        <iconEditor
          v-model:iconUrl="element.props.icon"
          :color="element.props.color"
        ></iconEditor>
      </el-form-item>
      <el-form-item label="未选颜色:">
        <el-color-picker
          v-model="element.props.voidColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="选中颜色:">
        <el-color-picker
          v-model="element.props.color"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-divider content-position="left">属性</el-divider>
      <el-form-item label="标题:" required>
        <el-input v-model="element.props.name" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="显示标题:">
        <el-switch v-model="element.props.showTitle"></el-switch>
      </el-form-item>
      <el-form-item label="必填:">
        <el-switch v-model="element.props.required"></el-switch>
      </el-form-item>
      <el-form-item label="图标个数:">
        <el-input-number
          v-model.number="element.props.count"
          :min="1"
          :max="100"
          :step="1"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="允许半选:">
        <el-switch v-model="element.props.allowHalf"></el-switch>
      </el-form-item>
    </el-form>
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
import iconEditor from "../commonProps/iconEditor.vue";
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
    iconEditor,
  },
  props: ["element"],
  setup(props, ctx) {
    return {};
  },
});
</script>
<style lang='less' scoped>
</style>