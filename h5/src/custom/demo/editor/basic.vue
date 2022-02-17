<template>
  <div>
    <el-form label-width="80px" size="default">
      <el-divider content-position="left">活动时间配置</el-divider>
      <el-form-item label="开始时间:" required>
        <el-date-picker v-model="basic.startTime" type="datetime"></el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间:" required>
        <el-date-picker v-model="basic.endTime" type="datetime"></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ElForm, ElFormItem, ElInputNumber, ElInput, ElDivider, ElDatePicker } from "element-plus";
import { ref, computed } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const basic = computed(() => store.state.editor.config?.basic)

</script>
<style lang='less' scoped>
</style>