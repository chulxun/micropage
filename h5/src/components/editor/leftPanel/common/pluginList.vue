<template>
  <div>
    <div v-for="(item, index) in pluginList" :key="index">
      <div class="plugin_list" v-if="operaType == index + 1">
        <div class="item">
          <div class="title">
            {{ item.title
            }}<i class="el-icon-close closed" @click="closedThis"></i>
          </div>
          <el-alert show-icon title="点击或拖拽组件到编辑器" type="warning">
          </el-alert>
          <div class="con img_list" v-if="item.children.length > 0">
            <div
              class="plug_item"
              v-for="(item1, index1) in item.children"
              :key="index1"
            >
              <i
                :class="item1.icon"
                v-if="item1.icon"
                draggable="true"
                @click="addElement(item1.name, item1.component, $event)"
                @dragstart="onDragStart(item1.name, item1.component, $event)"
              ></i>
              <img
                v-else
                :src="item1.img"
                class="img"
                draggable="true"
                @click="addElement(item1.name, item1.component, $event)"
                @dragstart="onDragStart(item1.name, item1.component, $event)"
              />
              <p>{{ item1.title }}</p>
            </div>
          </div>
          <el-empty v-else description="开发中，下个版本见"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";
import importPlugs from "@/mixins/importPlugs.ts";
import { ElEmpty, ElAlert } from "element-plus";
export default defineComponent({
  mixins: [importPlugs],
  components: { ElEmpty, ElAlert },

  setup(props, ctx) {
    const store = useStore();
    const operaType = computed(() => store.state.common.operaType);
    const setOperaType = (type: any) =>
      store.commit("common/setOperaType", type);
    const operateElement = (preload: any) =>
      store.commit("editor/operateElement", preload);
    //元素开始拖拽
    function onDragStart(name: string, component: any, event: DragEvent) {
      //设置拖动的数据
      event?.dataTransfer?.setData("pluginName", name);
      event?.dataTransfer?.setData("startX", event.offsetX + "");
      event?.dataTransfer?.setData("startY", event.offsetY + "");
      //设置组件默认属性和样式
      event?.dataTransfer?.setData(
        "defaultElement",
        JSON.stringify(component.defaultElement)
      );
    }
    function addElement(name: string, component: any, e: MouseEvent) {
      let defaultElement = component.defaultElement;
      operateElement({
        type: "add",
        value: { name, ...defaultElement },
      });
    }
    function closedThis() {
      setOperaType(0);
    }
    return { operaType, addElement, onDragStart, closedThis };
  },
});
</script>
<style lang='less' scoped>
.plugin_list {
  position: fixed;
  left: 80px;
  top: 60px;
  z-index: 1000;
  width: 290px;
  height: 100%;
  background: #fff;
  border-right: 1px solid var(--borderColor);
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.07);
  border-top-right-radius: 5px;
  padding: 0 16px;
  color: #333;
  .item {
    padding: 16px 0;
    .title {
      font-weight: bold;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
      .closed {
        cursor: pointer;
      }
    }
    .img_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .plug_item {
        position: relative;
        margin-top: 20px;
        background: var(--lightBgColor);
        border-radius: 5px;
        overflow: hidden;
        i {
          font-size: 40px;
          padding-bottom: 20px;
          width: 120px;
          height: 120px;
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
        }
      }
      .img {
        width: 120px;
        height: 120px;
      }
    }
  }
}
</style>