<template>
  <el-container>
    <el-header>
      <com-header>
        <topPanel :workId="workId"></topPanel>
      </com-header>
    </el-header>
    <el-container class="main_container">
      <leftPanel></leftPanel>
      <el-main>
        <mainPanel></mainPanel>
      </el-main>
      <rightPanel></rightPanel>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { ElContainer, ElHeader, ElMain, } from "element-plus";
import comHeader from "@/components/common/comHeader.vue";
import topPanel from "./topPanel.vue";
import leftPanel from "./leftPanel.vue";
import rightPanel from "./rightPanel.vue";
import mainPanel from "./mainPanel.vue";

const props = defineProps({
  workId: String
})

</script>
<style lang="less"  scoped>
</style>