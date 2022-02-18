<template>
  <div class="layer_container">
    <el-tooltip content="图层管理" placement="left">
      <div class="layer_icon" @click="toggleLayer" v-show="!showLayer">
        <i class="iconfont icon-tuceng"></i>
        <p>图层</p>
      </div>
    </el-tooltip>
    <div class="container" v-show="showLayer">
      <div class="title">
        <p>图层管理</p>
        <el-icon @click="toggleLayer">
          <arrow-right />
        </el-icon>
      </div>
      <div
        class="list"
        v-if="
          editingPage && editingPage.elements && editingPage.elements.length > 1
        "
        @dragstart="onDragStart"
        @drop="onDrop"
        @dragover="onDragOver"
      >
        <template v-for="(item, index) in editingPage.elements" :key="index">
          <div
            :class="{
              item: true,
              current: item == editingElement,
              disabled: item.props.hide,
            }"
            v-if="item.name != 'plug-page'"
            @click.stop="chooseElement(item)"
            draggable="true"
            :data-index="index"
          >
            <layerItem :item="item"></layerItem>
            <i class="iconfont icon-yincang" v-show="item.props.hide" @click.stop="onHide(item)"></i>
            <el-icon :size="14" v-show="!item.props.hide" @click.stop="onHide(item)">
              <View />
            </el-icon>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store/index";
import layerItem from "./item.vue";
import { View, ArrowRight } from '@element-plus/icons-vue'

const store = useStore();
const editingPage: any = computed(() => store.state.editor.editingPage);
const editingElement: any = computed(
  () => store.state.editor.editingElement
);
const setEditingElement = (element: any) =>
  store.commit("editor/setEditingElement", element);
const operateElement = (preload: any) =>
  store.commit("editor/operateElement", preload);
let showLayer = ref(false);
function toggleLayer() {
  showLayer.value = !showLayer.value;
}
//选中元素
function chooseElement(item: any) {
  if (item.props.hide) {
    return;
  }
  setEditingElement(item);
}
//隐藏显示图层
function onHide(item: any) {
  if (item.props.hide) {
    item.props.hide = false;
  } else {
    item.props.hide = true;
  }
}
//拖动图层排序
let draging: any = null;
//当被鼠标拖动的对象进入其容器范围内时触发
function onDragStart(event: DragEvent) {
  draging = event.target;
}
//当某被拖动的对象在另一对象容器范围内拖动时触发
function onDragOver(event: DragEvent) {
  event.preventDefault();
}
//在一个拖动过程中，释放鼠标键时触发
function onDrop(event: DragEvent) {
  event.preventDefault();
  const target: any = event.target;
  if (target.classList.contains("item") == true && target != draging) {
    if (target) {
      if (target.moving) {
        return;
      }
    }
    let startIndex = draging.getAttribute("data-index");
    let endIndex = target.getAttribute("data-index");
    if (startIndex != endIndex) {
      target.moving = true;
      //加1s时间防止多次触发排序，造成排序看起来没效果
      setTimeout(() => {
        target.moving = false;
      }, 1500);
      operateElement({
        type: "swap",
        value: {
          startIndex,
          endIndex,
        },
      });
    }
  }
}
</script>
<style lang='less' scoped>
.layer_container {
  left: 0;
  top: 0;
  position: absolute;
  transform: translateX(-100%);
  z-index: 1;
}
.layer_icon {
  width: 70px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid var(--borderColor);
  p {
    margin-left: 6px;
  }
}
.container {
  height: calc(100vh - 60px);
  width: 230px;
  background: #fff;
  border: 1px solid var(--borderColor);
  user-select: none;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px 0 15px;
    height: 40px;
    background-color: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    i {
      cursor: pointer;
    }
  }
}
.list {
  padding: 10px 0;
  flex: 1;
  overflow-y: auto;
  .item {
    display: flex;
    align-items: center;
    padding: 7px 10px;
    cursor: pointer;
    transition: all 0.3s;
    &.current {
      background: var(--lightColor);
    }
    :deep(i) {
      // pointer-events: none;
      width: 20px;
      text-align: center;
      &.disabled {
        color: #999;
      }
    }
    :deep(p) {
      pointer-events: none;
      flex: 1;
      padding: 0 5px;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 0;
      white-space: nowrap;
    }
    :deep(.icon_img) {
      pointer-events: none;
      width: 20px;
      height: 20px;
      object-fit: cover;
      border-radius: 2px;
    }
    &.disabled {
      // pointer-events: none;
      color: #999;
      :deep(img) {
        opacity: 0.4;
      }
    }
  }
}
</style>