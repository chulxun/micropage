<template>
  <div>
    <el-divider content-position="left">属性</el-divider>
    <el-form label-width="80px">
      <el-form-item label="上传图片:" required>
        <imgEditor v-model:imgUrl="element.props.imgUrl"></imgEditor>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="resetWH">重置图片宽高</el-button>
      </el-form-item>
    </el-form>
    <clickEditor :element="element"></clickEditor>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElDivider } from "element-plus";
import imgEditor from "../commonProps/imgEditor.vue";
import clickEditor from "../commonProps/clickEditor.vue";
import { loadImg } from "@/utils/index";
export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElDivider,
    imgEditor,
    clickEditor,
  },
  props: ["element"],
  setup(props, ctx) {
    async function resetWH() {
      let width = 0,
        height = 0;
      var img: any = await loadImg(props.element.props.imgUrl);
      if (img) {
        width = parseInt(img.width / 2 + "");
        height = parseInt(img.height / 2 + "");
      }
      props.element.style.width = width;
      props.element.style.height = height;
    }
    return { resetWH };
  },
  methods: {},
});
</script>
<style lang='less' scoped>
</style>