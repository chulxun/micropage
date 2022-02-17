<template>
  <div></div>
</template>
<script setup lang='ts'>
import { onMounted, computed } from "vue";
import { useStore } from "@/store/index";
import undoRedoHistory from "@/store/plugins/history";
const HOTKEY: any = {
  WINDOW: {
    CTRL: { val: 17, status: false },
    SHIFT: { val: 16, status: false },
    DELETE: { val: 46, status: false },
    LEFT: { val: 37, status: false },
    UP: { val: 38, status: false },
    RIGHT: { val: 39, status: false },
    DOWN: { val: 40, status: false },
    C: { val: 67, status: false },
    D: { val: 68, status: false },
    X: { val: 88, status: false },
    V: { val: 86, status: false },
    S: { val: 83, status: false },
    Z: { val: 90, status: false },
    Y: { val: 89, status: false },
    R: { val: 82, status: false },
    L: { val: 76, status: false },
    M: { val: 77, status: false },
    T: { val: 84, status: false },
    B: { val: 66, status: false },
  },
  MAC: {
    CTRL: { val: 91, status: false },
    SHIFT: { val: 16, status: false },
    DELETE: { val: 8, status: false },
    LEFT: { val: 37, status: false },
    UP: { val: 38, status: false },
    RIGHT: { val: 39, status: false },
    DOWN: { val: 40, status: false },
    C: { val: 67, status: false },
    D: { val: 68, status: false },
    X: { val: 88, status: false },
    V: { val: 86, status: false },
    S: { val: 83, status: false },
    Z: { val: 90, status: false },
    Y: { val: 89, status: false },
    R: { val: 82, status: false },
    L: { val: 76, status: false },
    M: { val: 77, status: false },
    T: { val: 84, status: false },
    B: { val: 66, status: false },
  },
};
const store = useStore();
const rulerVisible = computed(() => store.state.common.rulerVisible);
const setRulerVisible = (visible: boolean) =>
  store.commit("common/setRulerVisible", visible);
const saveWork = () => store.dispatch("editor/saveWork"); //保存作品方法
const operateElement = (preload: any) =>
  store.commit("editor/operateElement", preload); //操作元素方法
const moveElementPos = (moveType: string) =>
  store.commit("editor/moveElementPos", moveType); //元素移动1px
const changeElementAlign = (type: any) =>
  store.commit("editor/changeElementAlign", type);
const editingElement: any = computed(
  () => store.state.editor.editingElement
);
const setEditingElement = (element: any) =>
  store.commit("editor/setEditingElement", element);
const hotKey = /Mac/gi.test(navigator.userAgent) ? HOTKEY.MAC : HOTKEY.WINDOW;
const hotKeyVal: number[] = []
Object.values(hotKey).map((item: any) => {
  if (![91, 16, 17].includes(item.val)) {
    hotKeyVal.push(item.val)
  }
  return item
})
function bindKey(e: KeyboardEvent) {
  const { nodeName } = e.target as HTMLElement
  switch (e.keyCode) {
    case hotKey.CTRL.val:
      hotKey.CTRL.status = true;
      break;
    case hotKey.SHIFT.val:
      hotKey.SHIFT.status = true;
      break;
    case hotKey.R.val: //显示隐藏标尺
      if (hotKey.CTRL.status) {
        setRulerVisible(!rulerVisible.value);
      } else if (hotKey.SHIFT.status) {
        //右对齐
        onChangeAlign(1);
      }
      break;
    case hotKey.S.val: //保存作品
      if (hotKey.CTRL.status) saveWork();
      break;
    case hotKey.Z.val: //撤销
      if (hotKey.CTRL.status) undoRedoHistory.undo();
      break;
    case hotKey.Y.val: //重做
      if (hotKey.CTRL.status) undoRedoHistory.redo();
      break;
    case hotKey.X.val: //剪切
      if (/input|textarea/gi.test(nodeName.toLowerCase())) return;
      if (hotKey.CTRL.status)
        operateElement({
          type: "cut",
          value: {},
        });
      break;
    case hotKey.V.val: //粘贴
      if (/input|textarea/gi.test(nodeName.toLowerCase())) return;
      if (hotKey.CTRL.status)
        operateElement({
          type: "paste",
          value: {},
        });
      break;
    case hotKey.C.val: //复制
      if (/input|textarea/gi.test(nodeName.toLowerCase())) return;
      if (hotKey.CTRL.status) {
        operateElement({
          type: "copy",
          value: {},
        });
      } else if (hotKey.SHIFT.status) {
        //水平对齐
        onChangeAlign(3);
      }

      break;
    case hotKey.D.val: //删除
    case hotKey.DELETE.val: //删除
      if (/input|textarea/gi.test(nodeName.toLowerCase())) return;
      if (hotKey.CTRL.status)
        operateElement({
          type: "delete",
          value: {},
        });
      break;
    case hotKey.UP.val: //上移
      if (hotKey.CTRL.status) {
        operateElement({
          type: "moveup",
          value: {},
        });
      } else if (hotKey.SHIFT.status) {
        // 选中元素 上移1px
        moveElementPos('top')
      }
      break;
    case hotKey.DOWN.val: //下移
      if (hotKey.CTRL.status) {
        operateElement({
          type: "movedown",
          value: {},
        });
      } else if (hotKey.SHIFT.status) {
        // 选中元素 下移1px
        moveElementPos('bottom')
      }
      break;
    // 元素left左移
    case hotKey.LEFT.val:
      if (hotKey.SHIFT.status) {
        // 选中元素 左移1px
        moveElementPos('left')
      }
      break;
    // 元素left右移
    case hotKey.RIGHT.val:
      if (hotKey.SHIFT.status) {
        // 选中元素 右移1px
        moveElementPos('right')
      }
      break;
    case hotKey.L.val: //左对齐
      if (hotKey.SHIFT.status) {
        onChangeAlign(0);
      }
      break;
    case hotKey.M.val: //垂直对齐
      if (hotKey.SHIFT.status) {
        onChangeAlign(2);
      }
      break;
    case hotKey.T.val: //顶对齐
      if (hotKey.SHIFT.status) {
        onChangeAlign(4);
      }
      break;
    case hotKey.B.val: //底对齐
      if (hotKey.SHIFT.status) {
        onChangeAlign(5);
      }
      break;
  }
}
function onChangeAlign(type: number) {
  changeElementAlign(type);
  // //重置编辑元素 加这一句是为了触发存入history，然后进行撤销、重做
  setEditingElement(editingElement.value);
}
onMounted(() => {
  document.addEventListener(
    "keydown",
    function (e) {
      if (hotKeyVal.includes(e.keyCode) && (hotKey.CTRL.status || hotKey.SHIFT.status)) {
        console.log(e.keyCode, '拦截该键盘事件')
        e.preventDefault()
      }
      bindKey(e);
      return false;
    },
    true
  );

  window.onblur = function () {
    hotKey.CTRL.status = false;
    hotKey.SHIFT.status = false;
  };
  document.addEventListener(
    "keyup",
    function (e: KeyboardEvent) {
      for (const key in hotKey) {
        if (e.keyCode == hotKey[key].val) {
          hotKey[key].status = false;
        }
      }
    },
    true
  );
});
</script>
<style lang='less' scoped>
</style>