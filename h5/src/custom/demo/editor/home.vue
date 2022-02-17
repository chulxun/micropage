<template>
  <div>
    <el-form label-width="80px" size="default">
      <el-form-item label="背景颜色:">
        <el-color-picker v-model="home.backgroundColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="banner图:">
        <div>
          <imgEditor v-model:imgUrl="home.bannerUrl"></imgEditor>
          <p class="tips">注：图片尺寸：750 * any</p>
        </div>
      </el-form-item>
      <el-form-item label="规则按钮:">
        <div>
          <imgEditor v-model:imgUrl="home.ruleBtn"></imgEditor>
          <p class="tips">注：图片尺寸：160 * 60</p>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElColorPicker, ElInputNumber, ElInput, ElDivider } from "element-plus";
import { ref, computed } from "vue";
import { useStore } from "@/store/index";
import imgEditor from "@/components/plugins/commonProps/imgEditor.vue";

const store = useStore();
const home = computed(() => store.state.editor.config?.home)

</script>
<style lang='less' scoped>
</style>