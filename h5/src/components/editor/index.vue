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
import comHeader from "@/components/common/comHeader.vue";
import topPanel from "@/components/editor/topPanel/index.vue";
import leftPanel from "@/components/editor/leftPanel/index.vue";
import rightPanel from "@/components/editor/rightPanel/index.vue";
import mainPanel from "@/components/editor/mainPanel/index.vue";

const props = defineProps({
  workId: String
})

</script>
<style lang="less"  scoped>
</style>