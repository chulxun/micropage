<template>
  <div>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="default">
      <el-form-item label="背景颜色:">
        <el-color-picker v-model="element.style.backgroundColor" show-alpha></el-color-picker>
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

      <el-form-item label="边框颜色:">
        <el-color-picker v-model="element.style.borderColor" show-alpha></el-color-picker>
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
      <el-form-item label="内边距:">
        <el-input-number
          v-model.number="element.style.padding"
          :min="0"
          :max="100"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <textEditor v-model:text="element.props.text"></textEditor>
  </div>
</template>
<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElColorPicker,
  ElInputNumber,
  ElDivider,
} from "element-plus";
import textEditor from '../commonProps/textEditor.vue'
const props = defineProps<{
  element: H5.Element
}>()
</script>
<style lang='less' scoped>
</style>