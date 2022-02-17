<template>
  <div class="share_page">
    <div class="share_box">
      <div class="title">{{ config.share?.title }}</div>
      <div class="flex">
        <div class="desc">{{ config.share?.description }}</div>
        <img :src="config.share?.image" alt class="img" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const config = computed(() => store.state.editor.config)
</script>

<style lang="less" scoped>
.share_page {
  background: url(/images/weiye_custom_share_bg.jpg) no-repeat;
  background-size: 100% auto;
  height: 100%;
  position: relative;
  .share_box {
    background: #fff;
    border-radius: 3px;
    padding: 10px;
    width: 258px;
    position: absolute;
    right: 59px;
    top: 117px;
    .title {
      font-size: 15px;
      margin-bottom: 5px;
      font-weight: bold;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .flex {
      display: flex;
      .img {
        width: 50px;
        height: 50px;
        border-radius: 2px;
        margin-left: 10px;
        object-fit: cover;
      }
      .desc {
        flex: 1;
        font-size: 13px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}
</style>