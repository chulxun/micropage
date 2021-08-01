<template>
  <div>
    <cellEditor :element="element"></cellEditor>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="small">
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
    <p class="tips">目前只支持配置一列选择</p>
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
import cellEditor from "../commonProps/cellEditor.vue";
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
    cellEditor,
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