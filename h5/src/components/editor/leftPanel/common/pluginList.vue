<template>
  <div>
    <div v-for="(item, index) in pluginList" :key="index">
      <div class="plugin_list" v-if="operaType == index + 1">
        <div class="title">
          {{
            item.title
          }}
          <el-icon class="closed" @click="closedThis">
            <Close />
          </el-icon>
        </div>
        <el-alert show-icon title="点击或拖拽组件到编辑器" type="warning" :closable="false"></el-alert>
        <div class="con img_list" v-if="item.children.length > 0">
          <div class="plug_item" v-for="(item1, index1) in item.children" :key="index1">
            <i
              :class="item1.icon"
              v-if="item1.icon"
              draggable="true"
              @click="addElement(item1.name, $event)"
              @dragstart="onDragStart(item1.name, $event)"
            ></i>
            <img
              v-else
              :src="item1.img"
              class="img"
              draggable="true"
              @click="addElement(item1.name, $event)"
              @dragstart="onDragStart(item1.name, $event)"
            />
            <p>{{ item1.title }}</p>
          </div>
        </div>
        <el-empty v-else description="暂无组件"></el-empty>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store/index";
import { Close } from '@element-plus/icons-vue'
import { pluginList } from '@/data/pluginList'
import { pluginDefaultElements } from '@/components/plugins/config'

const store = useStore();
const operaType = computed(() => store.state.common.operaType);
const setOperaType = (type: any) =>
  store.commit("common/setOperaType", type);
const operateElement = (preload: any) =>
  store.commit("editor/operateElement", preload);
//元素开始拖拽
function onDragStart(name: string, event: DragEvent) {
  //设置拖动的数据
  event?.dataTransfer?.setData("pluginName", name);
  event?.dataTransfer?.setData("startX", event.offsetX + "");
  event?.dataTransfer?.setData("startY", event.offsetY + "");
  const defaultElement = pluginDefaultElements[name];
  //设置组件默认属性和样式
  event?.dataTransfer?.setData(
    "defaultElement",
    JSON.stringify(defaultElement)
  );
}
function addElement(name: string, e: MouseEvent) {
  const defaultElement = pluginDefaultElements[name];
  operateElement({
    type: "add",
    value: { name, ...defaultElement },
  });
}
function closedThis() {
  setOperaType(0);
}
</script>
<style lang='less' scoped>
.plugin_list {
  position: fixed;
  left: 80px;
  top: 60px;
  z-index: 1000;
  width: 260px;
  height: calc(100% - 60px);
  background: #fff;
  border-right: 1px solid var(--borderColor);
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.07);
  border-top-right-radius: 5px;
  color: #333;
  display: flex;
  flex-direction: column;
  .title {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    .closed {
      cursor: pointer;
    }
  }
  .img_list {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 12px;
    .plug_item {
      position: relative;
      margin-top: 12px;
      background: var(--lightBgColor);
      border-radius: 5px;
      overflow: hidden;
      width: 110px;
      height: 110px;
      float: left;
      margin-left: 12px;
      i {
        font-size: 40px;
        padding-bottom: 20px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      p {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 5px;
        font-size: 12px;
      }
    }
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>