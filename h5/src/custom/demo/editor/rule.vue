<template>
  <div>
    <el-form label-width="80px" size="default">
      <el-form-item label="背景颜色:">
        <el-color-picker v-model="rule.backgroundColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="标题颜色:">
        <el-color-picker v-model="rule.ruleColor" show-alpha></el-color-picker>
      </el-form-item>
      <el-form-item label="banner图:">
        <div>
          <imgEditor v-model:imgUrl="rule.bannerUrl"></imgEditor>
          <p class="tips">注：图片尺寸：750 * any</p>
        </div>
      </el-form-item>
      <el-form-item label="返回按钮:">
        <div>
          <imgEditor v-model:imgUrl="rule.backBtn"></imgEditor>
          <p class="tips">注：图片尺寸：160 * 60</p>
        </div>
      </el-form-item>
      <el-form-item label="活动规则:">
        <el-input v-model="rule.text" maxlength="200" :rows="10" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/index";
import imgEditor from "@/components/plugins/commonProps/imgEditor.vue";

const store = useStore();
const rule = computed(() => store.state.editor.config?.rule)

</script>
<style lang='less' scoped>
</style>