<template>
  <div>
    <cellEditor :element="element"></cellEditor>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="时间类型:">
        <el-select
          style="width: 100%"
          v-model="element.props.type"
          placeholder="请选择类型"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最小时间:" required>
        <el-date-picker
          v-model="element.props.minDate"
          type="datetime"
          placeholder="选择最小时间"
          :default-time="element.props.minDate"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="最大时间:" required>
        <el-date-picker
          v-model="element.props.maxDate"
          type="datetime"
          placeholder="选择最大时间"
          :default-time="element.props.maxDate"
        >
        </el-date-picker>
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
  ElDatePicker,
} from "element-plus";
import cellEditor from "../commonProps/cellEditor.vue";
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
    ElDatePicker,
    cellEditor,
  },
  props: ["element"],
  setup(props, ctx) {
    const typeOptions = [
      {
        label: "选择完整时间",
        value: "datetime",
      },
      {
        label: "选择年月日",
        value: "date",
      },
      {
        label: "选择时分",
        value: "time",
      },
      {
        label: "选择年月",
        value: "year-month",
      },
      {
        label: "选择月日",
        value: "month-day",
      },
      {
        label: "选择年月日小时",
        value: "datehour",
      },
    ];
    props.element.props.minDate = new Date(props.element.props.minDate);
    props.element.props.maxDate = new Date(props.element.props.maxDate);
    return { typeOptions };
  },
});
</script>
<style lang='less' scoped>
</style>