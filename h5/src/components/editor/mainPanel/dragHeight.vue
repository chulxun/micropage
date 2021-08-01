<template>
  <div
    class="scale_height_btn"
    style="position: absolute"
    @mousedown.stop="onMousedownDrag"
  >
    <i class="el-icon-caret-top"></i>
    <p>拖动调节页面高度 {{ editingPageProps.pageHeight }}px</p>
    <i class="el-icon-caret-bottom"></i>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from "vue";
import { useStore } from "@/store/index";
export default defineComponent({
  setup() {
    const store = useStore();
    const editingPageProps: any = computed(
      () => store.state.editor.editingPageProps
    );
    function onMousedownDrag(e: MouseEvent) {
      let startY = e.clientY;
      let mousemove = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        let curY = event.clientY - startY;
        if (editingPageProps.value.pageHeight < 667) {
          editingPageProps.value.pageHeight = 667;
        } else {
          editingPageProps.value.pageHeight += curY;
        }
      };
      let mouseup = (event: MouseEvent) => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      };
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    }
    return { editingPageProps, onMousedownDrag };
  },
});
</script>
<style lang='less' scoped>
.scale_height_btn {
  bottom: -36px;
  position: absolute;
  left: 0;
  z-index: 10;
  width: 100%;
  font-weight: bold;
  background: #fff;
  height: 36px;
  border: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  user-select: none;
  cursor: ns-resize;
  p {
    flex: 1;
    text-align: center;
  }
}
</style>