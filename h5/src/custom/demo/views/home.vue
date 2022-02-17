<template>
  <div class="demo_home" :style="{ backgroundColor: home.backgroundColor }">
    <img :src="home.bannerUrl" class="banner" />
    <img :src="home.ruleBtn" class="rule_btn" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const home = computed(() => store.state.editor.config?.home)
</script>

<style lang="less" scoped>
.demo_home {
  position: relative;
  min-height: 100%;
  img {
    max-width: 100%;
  }
  .banner {
    width: 100%;
  }
  .rule_btn {
    position: absolute;
    top: 0;
    right: 20px;
    width: 80px;
    height: auto;
  }
}
</style>