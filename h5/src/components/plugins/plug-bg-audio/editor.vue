<template>
  <div>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px">
      <el-form-item label="上传mp3:" required>
        <imgEditor v-model:imgUrl="element.props.audioUrl" :type="3"></imgEditor>
      </el-form-item>
      <el-form-item label="播放图标:">
        <imgEditor v-model:imgUrl="element.props.playIcon"></imgEditor>
      </el-form-item>
      <el-form-item label="暂停图标:">
        <imgEditor v-model:imgUrl="element.props.pauseIcon"></imgEditor>
      </el-form-item>
      <el-form-item label="自动播放:">
        <el-switch v-model="element.props.autoplay" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElDivider, ElSwitch } from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
const props = defineProps<{
  element: H5.Element
}>()
</script>
<style lang='less' scoped>
</style>