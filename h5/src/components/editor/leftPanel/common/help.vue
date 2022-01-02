<template>
  <!-- 帮助文档 -->
  <div class="source_content">
    <div class="title">
      帮助文档
      <el-icon class="closed" @click="closedThis">
        <Close />
      </el-icon>
    </div>

    <el-empty description="开发中，下个版本见"></el-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElEmpty, ElButton, ElIcon } from "element-plus";
import { useStore } from "@/store/index";
import { Close } from '@element-plus/icons-vue'
export default defineComponent({
  props: ["pluginType"],
  components: {
    ElEmpty, ElIcon,
    ElButton, Close
  },
  setup(props, ctx) {
    const store = useStore();

    const setOperaType = (type: any) =>
      store.commit("common/setOperaType", type);

    function closedThis() {
      setOperaType(0);
    }

    return {
      closedThis,
    };
  },
});
</script>
<style lang='less' scoped>
.source_content {
  position: fixed;
  left: 80px;
  top: 60px;
  z-index: 1000;
  width: 400px;
  height: 100%;
  background: #fff;
  border-right: 1px solid var(--borderColor);
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.07);
  color: #333;
  border-top-right-radius: 5px;
  display: flex;
  flex-direction: column;
  .title {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 16px;
    padding: 14px 0;
    border-bottom: 1px solid var(--borderColor);
    .closed {
      cursor: pointer;
    }
  }
}
</style>