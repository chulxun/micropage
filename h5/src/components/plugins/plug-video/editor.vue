<template>
  <div>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px">
      <el-form-item label="封面图:">
        <imgEditor v-model:imgUrl="element.props.imgUrl" :type="0"></imgEditor>
      </el-form-item>
      <el-form-item label="上传视频:">
        <imgEditor
          v-model:imgUrl="element.props.videoUrl"
          :sourceType="2"
          :type="0"
        ></imgEditor>
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
<script lang="ts">
import { defineComponent } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElDivider,
  ElSwitch,
} from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    imgEditor,
    ElSwitch,
  },
  props: ["element"],
  setup(props, ctx) {
    return {};
  },
});
</script>
<style lang='less' scoped>
</style>