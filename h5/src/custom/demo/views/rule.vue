<template>
  <div
    class="demo_rule"
    :style="{ backgroundColor: rule.backgroundColor, '--ruleColor': rule.ruleColor }"
  >
    <img :src="rule.bannerUrl" class="banner" />
    <img :src="rule.backBtn" class="back_btn" />
    <div class="text">
      <div class="head">活动规则</div>
      <div>{{ rule.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const rule = computed(() => store.state.editor.config?.rule)
</script>

<style lang="less" scoped>
.demo_rule {
  position: relative;
  min-height: 100%;
  img {
    max-width: 100%;
  }
  .banner {
    width: 100%;
  }
  .back_btn {
    position: absolute;
    top: 0;
    right: 20px;
    width: 80px;
    height: auto;
  }
  .text {
    padding: 10px;
    white-space: pre-line;
    background: #fff;
    border-radius: 10px;
    margin: 10px;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
    margin-top: 11px;
    margin-bottom: 12px;
    color: var(--ruleColor);
  }
}
</style>