<template>
  <div>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px">
      <el-form-item label="封面图:">
        <imgEditor v-model:imgUrl="element.props.imgUrl"></imgEditor>
      </el-form-item>
      <el-form-item label="上传视频:" required>
        <imgEditor v-model:imgUrl="element.props.videoUrl" :type="2"></imgEditor>
      </el-form-item>
      <el-form-item label="显示菜单:">
        <el-switch v-model="element.props.controls" />
      </el-form-item>
      <el-form-item label="自动播放:">
        <el-switch v-model="element.props.autoplay" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElDivider,
  ElSwitch,
} from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
const props = defineProps<{
  element: H5.Element
}>()

</script>
<style lang='less' scoped>
</style>