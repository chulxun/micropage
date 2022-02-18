<template>
  <div>
    <cellEditor :element="element"></cellEditor>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="default">
      <el-form-item label="类型:">
        <el-select style="width: 100%" v-model="element.props.type" placeholder="请选择类型">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="占位文字:">
        <el-input v-model="element.props.placeholder" maxlength="100"></el-input>
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
      <el-form-item label="最大长度:">
        <el-input-number
          v-model.number="element.props.maxlength"
          :min="1"
          :max="10000"
          :step="1"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="必填:">
        <el-switch v-model="element.props.required"></el-switch>
      </el-form-item>
      <el-divider content-position="left">多行文本框属性</el-divider>
      <el-form-item label="字数统计:">
        <el-switch v-model="element.props.showWordLimit"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import cellEditor from "../commonProps/cellEditor.vue";
const props = defineProps<{
  element: H5.Element
}>()
const typeOptions = [
  {
    label: "文字",
    value: "text",
  },
  {
    label: "密码",
    value: "password",
  },
  {
    label: "邮箱",
    value: "email",
  },
  {
    label: "手机号",
    value: "tel",
  },
  {
    label: "多行文本框",
    value: "textarea",
  },
];
</script>
<style lang='less' scoped>
</style>