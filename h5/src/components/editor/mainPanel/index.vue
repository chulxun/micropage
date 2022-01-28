<template>
  <div class="editor">
    <div
      v-if="editingPageProps"
      class="editor_container"
      @drop="drop"
      @dragover="allowDrop"
      :style="
        'transform:scale(' +
        scaleValue +
        ');height:' +
        editingPageProps.pageHeight +
        'px'
      "
      ref="editor"
      @mousedown="setEditingElement(null)"
    >
      <rulerTool></rulerTool>
      <draggable
        v-for="item in editingPage.elements"
        :key="item.ukey"
        :element="item"
        @click.right="clickRightKey(item, $event)"
      >
        <element :element="item"></element>
      </draggable>
      <dragHeight v-if="work.page_type == 1"></dragHeight>
      <rightKeyMenu
        v-if="showRightKeyMenu && editingElement"
        :style="rightMenuPosition"
        @hideRightKey="hideRightKey"
      ></rightKeyMenu>
      <hotKey></hotKey>
    </div>
    <pagesManage v-if="work.page_type == 2"></pagesManage>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, reactive, onMounted } from "vue";
import { useStore } from "@/store/index";
import element from "@/components/plugins/element.vue";
import draggable from "./draggable.vue";
import dragHeight from "./dragHeight.vue";
import rightKeyMenu from "./rightKeyMenu.vue";
import rulerTool from "./rulerTool.vue";
import hotKey from "./hotKey.vue";
import pagesManage from "./pagesManage.vue";

const store = useStore();
const scaleValue = computed(() => store.state.common.scaleValue);
const work = computed(() => store.state.editor.work);
const editingPage: any = computed(() => store.state.editor.editingPage);
const editingElement: any = computed(
  () => store.state.editor.editingElement
);
const editingPageProps: any = computed(
  () => store.state.editor.editingPageProps
);
const setEditingElement = (element: any) =>
  store.commit("editor/setEditingElement", element);
const operateElement = (preload: any) =>
  store.commit("editor/operateElement", preload);
const showRightKeyMenu = ref(false); //展示右键菜单
const rightMenuPosition = reactive({ left: "0px", top: "0px" });
const editor: any = ref(null);
//拖拽元素拖动到放置目标时触发
function allowDrop(ev: DragEvent) {
  ev.preventDefault();
}
//在一个拖动过程中，释放鼠标键时触发此事件
function drop(ev: DragEvent) {
  ev.preventDefault();
  let name = ev?.dataTransfer?.getData("pluginName");
  let defaultElement = JSON.parse(
    ev?.dataTransfer?.getData("defaultElement") || "{style:{},props:{}}"
  );
  let startX = ev?.dataTransfer?.getData("startX") || "0";
  let startY = ev?.dataTransfer?.getData("startY") || "0";
  let pos = {
    left: ev.offsetX - parseInt(startX),
    top: ev.offsetY - parseInt(startY),
  };
  if (defaultElement.style) {
    Object.assign(defaultElement.style, pos);
  } else {
    defaultElement.style = pos;
  }
  operateElement({
    type: "add",
    value: { name, ...defaultElement },
  });
}
//按下鼠标右键，出现菜单
function clickRightKey(element: H5.Element, e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  if (element.name == "plug-page") return;
  let { x, y } = editor.value.getBoundingClientRect();
  //获取菜单出现位置，需要考虑画布缩放
  rightMenuPosition.left =
    parseInt((e.clientX - x) / scaleValue.value + "") + "px";
  rightMenuPosition.top =
    parseInt((e.clientY - y) / scaleValue.value + "") + "px";
  showRightKeyMenu.value = true;
}
//移除右键菜单
function hideRightKey() {
  showRightKeyMenu.value = false;
}

onMounted(() => {
  //点击任意区域，右键菜单隐藏
  document.addEventListener(
    "click",
    function () {
      hideRightKey();
    },
    false
  );
});
</script>
<style lang='less' scoped>
.editor {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  padding: 60px;
}
.editor_container {
  width: 375px;
  height: 667px;
  background: url(/images/weiye_default_transparent.png) no-repeat center center;
  background-size: cover;
  position: relative;
  margin: 0 auto;
  transform-origin: center top;
}
</style>