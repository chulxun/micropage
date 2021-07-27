<template>
  <div class="add_content">
    <div class="item">
      <i class="el-icon-tickets"></i>
      <div class="title">长页H5</div>
      <p>单页灵活控制页面长度</p>
      <el-button size="small" type="primary" round @click="createWork(1)"
        >创建</el-button
      >
    </div>
    <div class="item">
      <i class="el-icon-document-copy"></i>
      <div class="title">多页H5</div>
      <p>多页触摸滑动切换</p>
      <el-button size="small" type="primary" round @click="createWork(2)"
        >创建</el-button
      >
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { ElButton } from "element-plus";
import { useRoute } from "vue-router";
import { useStore } from "@/store/index";
export default defineComponent({
  props: ["addVisible"],
  components: { ElButton },
  setup(props, ctx) {
    const route = useRoute();
    const store = useStore();
    const createWorkAction = (work) =>
      store.dispatch("editor/createWork", work);
    //创建作品
    async function createWork(page_type: number) {
      await createWorkAction({ page_type });
      ctx.emit("update:addVisible", false);
      ctx.emit("refreshData");
    }
    return { createWork };
  },
});
</script>
<style lang='less' scoped>
.add_content {
  display: flex;
  justify-content: space-around;
  margin-top: -15px;
  padding-bottom: 10px;
  .item {
    width: 190px;
    height: 200px;
    background: var(--lightBgColor);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      font-size: 60px;
    }
    .title {
      padding-top: 10px;
      padding-bottom: 5px;
      font-size: 18px;
      font-weight: bold;
    }
    p {
      font-size: 12px;
      color: #888;
      padding-bottom: 12px;
    }
  }
}
</style>