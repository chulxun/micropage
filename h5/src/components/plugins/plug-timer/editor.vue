<template>
  <div>
    <cellEditor :element="element"></cellEditor>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px" size="small">
      <el-form-item label="时间格式:">
        <el-select
          style="width: 100%"
          v-model="element.props.format"
          placeholder="请选择"
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
      <el-form-item label="时间:" required>
        <el-date-picker
          v-model="element.props.time"
          type="datetime"
          placeholder="选择时间"
          :default-time="element.props.time"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="必填:">
        <el-switch v-model="element.props.required"></el-switch>
      </el-form-item>
      <el-form-item label="结束时触发:">
        <el-select
          style="width: 100%"
          v-model="element.props.eventType"
          placeholder="请选择"
        >
          <el-option
            v-for="item in eventOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="触发内容:" v-if="element.props.eventType > 0">
        <el-input
          v-model="element.props.eventContent"
          :placeholder="placeHolder"
          maxlength="100"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
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
        label: "HH:mm:ss",
        value: "HH:mm:ss",
      },
      {
        label: "DD 天 HH 时 mm 分 ss 秒",
        value: "DD 天 HH 时 mm 分 ss 秒",
      },
      {
        label: "DD 天 HH 时 mm 分",
        value: "DD 天 HH 时 mm 分",
      },
      {
        label: "DD 天 HH 时",
        value: "DD 天 HH 时",
      },
    ];
    const eventOptions = [
      {
        label: "无",
        value: 0,
      },
      {
        label: "隐藏倒计时",
        value: 1,
      },
      {
        label: "跳转链接",
        value: 2,
      },
      {
        label: "toast提示",
        value: 3,
      },
    ];
    let placeHolder = computed(() => {
      switch (props.element.props.clickType) {
        case 1:
          return "请输入url";
        case 2:
          return "请输入toast内容";
        default:
          return "请输入内容";
      }
    });
    props.element.props.time = new Date(props.element.props.time);
    return { typeOptions, eventOptions, placeHolder };
  },
});
</script>
<style lang='less' scoped>
</style>