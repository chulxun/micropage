<template>
  <div>
    <cellEditor :element="element"></cellEditor>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="default">
      <el-form-item label="选择项:">
        <el-select style="width: 100%" v-model="element.props.columnsNum" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题:" required>
        <el-input v-model="element.props.name" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="显示标题:">
        <el-switch v-model="element.props.showTitle"></el-switch>
      </el-form-item>
      <el-form-item label="左文本宽:">
        <el-input-number
          v-model.number="element.props.labelWidth"
          :min="1"
          :max="10000"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="必填:">
        <el-switch v-model="element.props.required"></el-switch>
      </el-form-item>
      <el-form-item label="picker标题:">
        <el-input v-model="element.props.title" maxlength="100"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElInput,
  ElDivider,
  ElSelect,
  ElOption,
  ElSwitch,
} from "element-plus";
import cellEditor from "../commonProps/cellEditor.vue";
const props = defineProps<{
  element: H5.Element
}>()
const typeOptions = [
  {
    label: "选择省市区",
    value: 3,
  },
  {
    label: "选择省市",
    value: 2,
  },
  {
    label: "选择省",
    value: 1,
  },
];
</script>
<style lang='less' scoped>
</style>