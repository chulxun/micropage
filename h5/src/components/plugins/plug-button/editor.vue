<template>
  <div>
    <cellEditor :element="element"></cellEditor>
    <el-form label-width="80px" size="small">
      <el-form-item label="左右内边距:">
        <el-input-number
          v-model.number="element.style.padding"
          :min="0"
          :max="100"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-divider content-position="left">属性</el-divider>
      <el-form-item label="按钮文字:" required>
        <el-input v-model="element.props.text" maxlength="100"></el-input>
      </el-form-item>
    </el-form>
    <clickEditor :element="element"></clickEditor>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElInputNumber, ElInput, ElDivider } from "element-plus";
import clickEditor from "../commonProps/clickEditor.vue";
import cellEditor from "../commonProps/cellEditor.vue";
const props = defineProps<{
  element: H5.Element
}>()
</script>
<style lang='less' scoped>
</style>