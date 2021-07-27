// 操作组件元素的移动、缩放、旋转
<template>
  <div
    :class="{ drag: true, drag_active: editingElement == element }"
    @mousedown.stop="handleMousedown"
    :style="getElementStyle(element.style)"
    ref="rotate"
    v-if="element.name != 'plug-page' && !element.props.hide"
  >
    <template v-if="editingElement == element">
      <!-- 放大缩小圆点 -->
      <div
        class="point"
        :data-name="item"
        v-for="(item, index) in point_names"
        :key="index"
        @mousedown.stop="mousedownScale(item, $event)"
      ></div>
      <!-- 旋转按钮 -->
      <i class="fa fa-undo rotate_btn" @mousedown.stop="mousedownRotate"></i>
      <!-- 尺寸展示 -->
      <div class="size_detail">
        {{ element.style.width + "*" + element.style.height }}
      </div>
      <!-- 旋转信息展示 -->
      <div class="rotate_detail">
        {{
          element.style.transform
            ? element.style.transform
                .replace("rotateZ(", "")
                .replace("deg)", "")
            : 0
        }}°
      </div>
    </template>
    <animation :element="element"> <slot></slot></animation>
  </div>
  <div
    v-else-if="!element.props.hide"
    class="drag"
    :style="getElementStyle(element.style)"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, onBeforeMount, ref } from "vue";
import { useStore } from "@/store/index";
import { getElementStyle } from "@/utils/element";
import animation from "./animation.vue";
export default defineComponent({
  props: ["element"],
  components: {
    animation,
  },
  setup(props) {
    const store = useStore();
    const point_names = reactive(["lt", "t", "rt", "r", "rb", "b", "lb", "l"]);
    const editingElement: any = computed(
      () => store.state.editor.editingElement
    );
    const setEditingElement = (element: any) =>
      store.commit("editor/setEditingElement", element);
    const rotate = ref(null); //旋转元素
    //组件响应 鼠标按下事件
    function handleMousedown(e: MouseEvent) {
      //将该元素置为正在编辑元素
      if (props.element != editingElement.value) {
        setEditingElement(props.element);
      }
      //disableMove不能移动组件位置
      // if (!this.element.pluginProps.disableMove) {
      //   this.mousedownForElement(e, this.element);
      // }
      //拖拽移动位置
      const position = props.element.style;
      let top = position.top;
      let left = position.left;
      let startX = e.clientX;
      let startY = e.clientY;
      let mousemove = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        let curX = event.clientX;
        let curY = event.clientY;
        let disY = curY - startY;
        let disX = curX - startX;
        let newLeft = +left + disX;
        let newTop = +top + disY;
        position.left = newLeft;
        position.top = newTop;
      };
      let mouseup = (event: MouseEvent) => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      };
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    }
    //元素四周圆点鼠标按下，放大缩小元素
    function mousedownScale(point: string, e: MouseEvent) {
      const position = props.element.style;
      const oriWidth = position.width;
      const oriHeight = position.height;
      let height = position.height;
      let width = position.width;
      let top = position.top;
      let left = position.left;
      // const oriCale = oriWidth / oriHeight; //shift键同时按下 等比例拖拽 todo
      let startX = e.clientX;
      let startY = e.clientY;
      let mousemove = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        let curX = event.clientX;
        let curY = event.clientY;
        let disY = curY - startY;
        let disX = curX - startX;
        let hasT = /t/.test(point);
        let hasB = /b/.test(point);
        let hasL = /l/.test(point);
        let hasR = /r/.test(point);
        let newHeight = +height + (hasT ? -disY : hasB ? disY : 0);
        let newWidth = +width + (hasL ? -disX : hasR ? disX : 0);
        let newLeft = +left + (hasL ? disX : 0);
        let newTop = +top + (hasT ? disY : 0);
        // if (oriCale) {
        //   //?等比例拖拽
        //   if (point == "rt") {
        //     newHeight = parseInt(newWidth / oriCale + "");
        //     newTop = top - (newHeight - height);
        //   }
        //   if (point == "lt") {
        //     newHeight = parseInt(newWidth / oriCale + "");
        //     newTop = top - (newHeight - height);
        //     newLeft = left - (newWidth - width);
        //   }
        //   if (point == "lb") {
        //     newHeight = parseInt(newWidth / oriCale + "");
        //     newLeft = left - (newWidth - width);
        //   }
        //   if (point == "rb") {
        //     newHeight = parseInt(newWidth / oriCale + "");
        //   }
        //   if (point == "b") {
        //     newWidth = parseInt(newHeight * oriCale + "");
        //   }
        //   if (point == "t") {
        //     newTop = top - (newHeight - height);
        //     newWidth = parseInt(newHeight * oriCale + "");
        //   }
        //   if (point == "l") {
        //     newHeight = parseInt(newWidth / oriCale + "");
        //     newTop = top - (newHeight - height);
        //     newLeft = left - (newWidth - width);
        //   }
        //   if (point == "r") {
        //     newHeight = parseInt(newWidth / oriCale + "");
        //   }
        // }
        position.height = newHeight > 0 ? newHeight : 0;
        position.width = newWidth > 0 ? newWidth : 0;
        position.left = newLeft;
        position.top = newTop;
      };
      let mouseup = (event: MouseEvent) => {
        //重置编辑元素 加这一句是为了触发存入history，然后进行撤销、重做
        setEditingElement(props.element);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      };
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    }

    //元素旋转
    function mousedownRotate(e: MouseEvent) {
      e.preventDefault();
      let curElement: any = rotate.value;
      const position = props.element.style;
      const rect = curElement.getBoundingClientRect();
      let top = rect.top;
      let left = rect.left;
      let width = rect.width;
      let height = rect.height;
      let center = {
        x: left + width / 2,
        y: top + height / 2,
      };
      //初始化curAngle，getDragAngle才能调用
      let curAngle = parseInt(
        position?.transform?.replace("rotateZ(", "").replace("deg)", "") || 0
      );
      curAngle = getDragAngle(e);
      let mousemove = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        let endAngle = getDragAngle(event);
        position.transform = "rotateZ(" + endAngle + "deg)";
      };
      let mouseup = (event: MouseEvent) => {
        props.element.props.angle = getDragAngle(event);
        //重置编辑元素 加这一句是为了触发存入history，然后进行撤销、重做
        setEditingElement(props.element);
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      };
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
      function getDragAngle(event: MouseEvent) {
        let sAngle = curAngle || 0;
        let angle =
          (Math.atan2(
            parseFloat(center.y) - event.clientY,
            parseFloat(center.x) - event.clientX
          ) *
            180) /
          Math.PI;

        let endAngle = parseInt(angle - sAngle + "");
        return endAngle;
      }
    }

    onBeforeMount(() => {});
    return {
      rotate,
      point_names,
      getElementStyle,
      editingElement,
      handleMousedown,
      mousedownScale,
      mousedownRotate,
    };
  },
});
</script>
<style lang='less' scoped>
.drag {
  position: absolute;
  user-select: none;
}
.drag_active {
  outline: 1px dashed #70c0ff !important;
  cursor: move;
}
.size_detail,
.rotate_detail {
  position: absolute;
  top: -6px;
  right: 0;
  border-radius: 5px;
  background: #f1f1f1;
  color: #333;
  padding: 4px 8px;
  transform: translateY(-100%);
}
.rotate_detail {
  right: auto;
  left: 0;
}
.rotate_btn {
  position: absolute;
  top: -5px;
  left: -5px;
  transform: translate(-100%, -100%);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background: #fff;
  color: #333;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: alias;
}
.point {
  position: absolute;
  transform: translate(-50%, -50%);
  border: 1px solid #70c0ff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: #fff;
  &:nth-child(1) {
    top: 0;
    left: 0;
    cursor: nw-resize;
  }
  &:nth-child(2) {
    top: 0;
    left: 50%;
    cursor: n-resize;
  }
  &:nth-child(3) {
    top: 0;
    left: 100%;
    cursor: ne-resize;
  }
  &:nth-child(4) {
    top: 50%;
    left: 100%;
    cursor: e-resize;
  }
  &:nth-child(5) {
    top: 100%;
    left: 100%;
    cursor: se-resize;
  }
  &:nth-child(6) {
    top: 100%;
    left: 50%;
    cursor: s-resize;
  }
  &:nth-child(7) {
    top: 100%;
    left: 0;
    cursor: sw-resize;
  }
  &:nth-child(8) {
    top: 50%;
    left: 0;
    cursor: w-resize;
  }
}
</style>