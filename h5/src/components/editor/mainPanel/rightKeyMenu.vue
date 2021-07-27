<template>
  <div class="right_key_menu">
    <div @click.stop="onCopy" @mousedown.stop="">
      <i class="fa fa-copy"></i>复制
    </div>
    <div class="del" @click.stop="onDelete" @mousedown.stop="">
      <i class="fa fa-trash-o"></i>删除
    </div>
    <div @click.stop="onMoveUp" @mousedown.stop="">
      <i class="fa fa-hand-o-up"></i>上移
    </div>
    <div @click.stop="onMoveDown" @mousedown.stop="">
      <i class="fa fa-hand-o-down"></i>下移
    </div>
    <div class="tips">在图层中执行更多操作</div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "@/store/index";
export default defineComponent({
  setup(props, ctx) {
    const store = useStore();
    const editingElement: any = computed(
      () => store.state.editor.editingElement
    );
    const operateElement = (preload: any) =>
      store.commit("editor/operateElement", preload); //操作元素方法
    //复制
    function onCopy(e) {
      if (editingElement.value) {
        operateElement({
          type: "copy",
          value: {},
        });
        ctx.emit("hideRightKey");
      } else {
        ElMessage.error("请选择一个元素进行操作");
      }
    }
    //删除
    function onDelete() {
      if (editingElement.value) {
        operateElement({
          type: "delete",
          value: editingElement.value,
        });
        ctx.emit("hideRightKey");
      } else {
        ElMessage.error("请选择一个元素进行操作");
      }
    }
    //上移
    function onMoveUp() {
      if (editingElement.value) {
        operateElement({
          type: "moveup",
          value: editingElement.value,
        });
        ctx.emit("hideRightKey");
      } else {
        ElMessage.error("请选择一个元素进行操作");
      }
    }
    //下移
    function onMoveDown() {
      if (editingElement.value) {
        operateElement({
          type: "movedown",
          value: editingElement.value,
        });
        ctx.emit("hideRightKey");
      } else {
        ElMessage.error("请选择一个元素进行操作");
      }
    }
    return { editingElement, onCopy, onDelete, onMoveUp, onMoveDown };
  },
});
</script>
<style lang='less' scoped>
.right_key_menu {
  position: absolute;
  background: #fff;
  min-width: 150px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  z-index: 10;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  > div {
    cursor: pointer;
    padding: 7px 12px;
    border-bottom: 1px dotted var(--borderColor);
    &:last-child {
      border-color: transparent;
    }

    &:hover {
      color: var(--primaryColor);
    }
    &.del {
      color: var(--dangerColor);
      &:hover {
        color: var(--dangerColor);
      }
    }
    i {
      width: 20px;
    }
  }
  .tips {
    font-size: 12px;
    color: #999;
    cursor: default;
    &:hover {
      color: #999;
    }
  }
}
</style>