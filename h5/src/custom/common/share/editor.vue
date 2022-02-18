<template>
  <div>
    <el-form label-width="80px" size="default">
      <el-form-item label="分享图标:">
        <div>
          <imgEditor v-model:imgUrl="share.image"></imgEditor>
          <p class="tips">注：图片尺寸：300 * 300</p>
        </div>
      </el-form-item>
      <el-form-item label="分享标题:" required>
        <el-input v-model="share.title" maxlength="100" :rows="2" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="分享描述:" required>
        <el-input v-model="share.description" maxlength="200" :rows="4" type="textarea"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/index";
import imgEditor from "@/components/plugins/commonProps/imgEditor.vue";

const store = useStore();
const share = computed(() => store.state.editor.config?.share)

</script>
<style lang='less' scoped>
</style>