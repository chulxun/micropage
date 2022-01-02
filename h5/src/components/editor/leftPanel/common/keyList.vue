<template>
  <!-- 快捷键列表 -->
  <div class="key_list">
    <div class="title">
      快捷键使用
      <el-icon class="closed" @click="closedThis">
        <Close />
      </el-icon>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in keyList" :key="index">
        <div class="name">{{ item.name }}</div>
        <div class="key">{{ item.key }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";
import { ElIcon } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
export default defineComponent({
  props: ["pluginType"],
  components: { ElIcon, Close },
  data() {
    return {
      keyList: [
        {
          name: "保存",
          key: "⌘ + S",
        },
        {
          name: "删除",
          key: "⌘ + (Delete /D)",
        },
        {
          name: "撤销",
          key: "⌘ + Z",
        },
        {
          name: "重做",
          key: "⌘ + Y",
        },
        {
          name: "复制",
          key: "⌘ + C",
        },
        {
          name: "剪切",
          key: "⌘ + X",
        },
        {
          name: "粘贴",
          key: "⌘ + V",
        },
        {
          name: "标尺",
          key: "⌘ + R",
        },
        {
          name: "上移",
          key: "⌘ + UP",
        },
        {
          name: "下移",
          key: "⌘ + DOWN",
        },
        {
          name: "左对齐",
          key: "Shift + L",
        },
        {
          name: "右对齐",
          key: "Shift + R",
        },
        {
          name: "垂直居中",
          key: "Shift + M",
        },
        {
          name: "水平居中",
          key: "Shift + C",
        },
        {
          name: "顶对齐",
          key: "Shift + T",
        },
        {
          name: "底对齐",
          key: "Shift + B",
        },
      ],
    };
  },

  setup(props, ctx) {
    const store = useStore();
    const operaType = computed(() => store.state.common.operaType);
    const setOperaType = (type: any) =>
      store.commit("common/setOperaType", type);
    function closedThis() {
      setOperaType(0);
    }
    return { closedThis };
  },
});
</script>
<style lang='less' scoped>
.key_list {
  position: fixed;
  left: 80px;
  bottom: 0px;
  z-index: 1000;
  width: 350px;
  height: 50vh;
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
  .list {
    overflow-y: auto;
    flex: 1;
    margin-left: 16px;
  }
  .item {
    border-bottom: 1px solid var(--borderColor);
    padding: 13px 0;
    display: flex;
    align-items: center;
    opacity: 0.8;
    .name {
      width: 80px;
    }
  }
}
</style>