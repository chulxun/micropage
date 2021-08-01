
//公用编辑器--编辑位置，宽高，唯一标识
<template>
  <div>
    <el-divider content-position="left">位置</el-divider>
    <el-form :model="element" size="small" label-width="80px">
      <el-form-item label="唯一标识:">
        <el-input v-model="element.ukey" disabled></el-input>
      </el-form-item>
      <el-form-item label="宽度:">
        <el-input-number
          v-model.number="element.style.width"
          :min="1"
          :max="1000"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="高度:">
        <el-input-number
          v-model.number="element.style.height"
          :min="1"
          :max="1000"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="左边距离:">
        <el-input-number
          v-model.number="element.style.left"
          :min="-1000"
          :max="100000"
          label="px"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="顶部距离:">
        <el-input-number
          v-model.number="element.style.top"
          :min="-1000"
          :max="100000"
          label="px"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts'>
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElDivider,
  ElButton,
} from "element-plus";
import { defineComponent } from "vue";
export default defineComponent({
  props: ["element"],
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElInputNumber,
    ElDivider,
    ElButton,
  },
  setup() {
    return {};
  },
});
</script>
<style lang='less' scoped>
</style>