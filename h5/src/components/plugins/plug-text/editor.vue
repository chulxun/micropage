<template>
  <div>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px">
      <el-form-item label="背景颜色:">
        <el-color-picker
          v-model="element.style.backgroundColor"
          show-alpha
          size="small"
        ></el-color-picker>
      </el-form-item>

      <el-form-item label="圆角:">
        <el-input-number
          v-model.number="element.style.borderRadius"
          :min="0"
          :max="100"
          :step="1"
          label="px"
          controls-position="right"
          size="small"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="边框颜色:">
        <el-color-picker
          v-model="element.style.borderColor"
          show-alpha
          size="small"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="边框宽度:">
        <el-input-number
          v-model.number="element.style.borderWidth"
          :min="0"
          :max="100"
          :step="1"
          label="px"
          size="small"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="内边距:">
        <el-input-number
          v-model.number="element.style.padding"
          :min="0"
          :max="100"
          :step="1"
          label="px"
          size="small"
          controls-position="right"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <textEditor :element="element"></textEditor>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import {
  ElForm,
  ElFormItem,
  ElColorPicker,
  ElInputNumber,
  ElButton,
  ElDivider,
} from "element-plus";
export default defineComponent({
  components: {
    ElForm,
    ElColorPicker,
    ElInputNumber,
    ElFormItem,
    ElButton,
    ElDivider,
    textEditor: defineAsyncComponent(
      () => import("../commonProps/textEditor.vue")
    ),
  },
  props: ["element"],
  setup(props, ctx) {
    return {};
  },
});
</script>
<style lang='less' scoped>
</style>