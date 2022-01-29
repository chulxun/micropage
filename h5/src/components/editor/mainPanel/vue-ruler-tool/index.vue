<template>
  <div
    :style="{
      width: windowWidth + 'px',
      height: windowHeight + 18 + 'px',
      position: 'absolute',
      top: '-18px',
      left: '-18px',
    }"
    class="vue-ruler-wrapper"
    onselectstart="return false;"
    @mousemove="dottedLineMove"
    @mouseup="dottedLineUp"
  >
    <section v-show="rulerToggle">
      <div ref="horizontalRuler" class="vue-ruler-h" @mousedown.stop="horizontalDragRuler">
        <span
          v-for="(item, index) in xScale"
          :key="index"
          :style="{ left: index * 50 + 2 + 'px' }"
          class="n"
        >{{ item.id }}</span>
      </div>
      <div ref="verticalRuler" class="vue-ruler-v" @mousedown.stop="verticalDragRuler">
        <span
          v-for="(item, index) in yScale"
          :key="index"
          :style="{ top: index * 50 + 2 + 'px' }"
          class="n"
        >{{ item.id }}</span>
      </div>
      <div :style="{ top: verticalDottedTop + 'px' }" class="vue-ruler-ref-dot-h" />
      <div :style="{ left: horizontalDottedLeft + 'px' }" class="vue-ruler-ref-dot-v" />
      <div
        v-for="item in lineList"
        :title="item.title"
        :style="getLineStyle(item)"
        :key="item.id"
        :class="`vue-ruler-ref-line-${item.type}`"
        @mousedown="handleDragLine(item)"
      ></div>
    </section>
    <div ref="content" class="vue-ruler-content">
      <slot />
    </div>
    <div v-show="isDrag" class="vue-ruler-content-mask"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted } from 'vue'
const props = defineProps({
  presetLine: {
    type: Array,
    default: () => {
      return [];
    },
  }, // 预置参考线
  visible: {
    type: Boolean,
    default: true,
  },
  stepLength: {
    type: Number,
    default: 50,
    validator: (val: number) => val % 10 === 0,
  }, // 步长
  windowHeight: {
    type: Number,
    default: 667,
  }, // 页面高度
})
const emit = defineEmits(['lineChange'])
const size = ref(17)
const windowWidth = ref(393) // 窗口宽度
const xScale: any[] = reactive([]) // 水平刻度
const yScale: any[] = reactive([]) // 垂直刻度
const topSpacing = ref(0) // 标尺与窗口上间距
const leftSpacing = ref(0)//  标尺与窗口左间距
const isDrag = ref(false)
const dragFlag = ref("") // 拖动开始标记，可能值x(从水平标尺开始拖动),y(从垂直标尺开始拖动)
const horizontalDottedLeft = ref(-999) // 水平虚线位置
const verticalDottedTop = ref(-999) // 垂直虚线位置
const rulerWidth = ref(0) // 垂直标尺的宽度
const rulerHeight = ref(0)// 水平标尺的高度
const dragLineId = ref("") // 被移动线的ID
const rulerToggle = ref(true) // 标尺辅助线显示开关
const verticalRuler: any = ref(null)
const horizontalRuler: any = ref(null)
const lineList = computed(() => {
  let hCount = 0;
  let vCount = 0;
  return props.presetLine.map((item: any) => {
    const isH = item.type === "h";
    return {
      id: `${item.type}_${isH ? hCount++ : vCount++}`,
      type: item.type,
      title: item.site.toFixed(2) + "px",
      [isH ? "top" : "left"]:
        item.site / (props.stepLength / 50) + size.value,
    };
  });
})
watch(() => props.visible, (val: boolean) => rulerToggle.value = val, {
  immediate: true,
})
watch(() => props.windowHeight, (val: number) => {
  xScale.length = 0
  yScale.length = 0
  scaleCalc();
})
onMounted(() => {
  init()
})

const init = () => {
  box();
  scaleCalc();
}

const getLineStyle = ({ type, top, left }: any) => {
  return type === "h" ? { top: top + "px" } : { left: left + "px" };
}
const handleDragLine = ({ type, id }: { type: string, id: string }) => {
  return type === "h"
    ? dragHorizontalLine(id)
    : dragVerticalLine(id);
}
const box = () => {
  rulerWidth.value = verticalRuler.value.clientWidth;
  rulerHeight.value = horizontalRuler.value.clientHeight;
  setSpacing();
}
// 获取窗口宽与高
const setSpacing = () => {
  if (horizontalRuler.value) {
    topSpacing.value = horizontalRuler.value.getBoundingClientRect().y;
  }
  if (verticalRuler.value) {
    leftSpacing.value = verticalRuler.value.getBoundingClientRect().x;
  }
}
// 计算刻度
const scaleCalc = () => {
  getCalc(xScale, windowWidth.value);
  getCalc(yScale, props.windowHeight);
}

// 获取刻度方法
const getCalc = (array: any[], length: number) => {
  for (
    let i = 0;
    i < (length * props.stepLength) / 50;
    i += props.stepLength
  ) {
    if (i % props.stepLength === 0) {
      array.push({ id: i });
    }
  }
}

// 获取矫正刻度方法
const getCalcRevise = (array: any[], length: number) => {
  for (let i = 0; i < length; i += 1) {
    if (i % props.stepLength === 0 && i + props.stepLength <= length) {
      array.push({ id: i });
    }
  }
}

// 生成一个参考线
const newLine = (val: any) => {
  isDrag.value = true;
  dragFlag.value = val;
}
// 虚线移动
const dottedLineMove = ($event: MouseEvent) => {
  setSpacing();
  switch (dragFlag.value) {
    case "x":
      if (isDrag.value) {
        verticalDottedTop.value = $event.pageY - topSpacing.value;
      }
      break;
    case "y":
      if (isDrag.value) {
        horizontalDottedLeft.value = $event.pageX - leftSpacing.value;
      }
      break;
    case "h":
      if (isDrag.value) {
        verticalDottedTop.value = $event.pageY - topSpacing.value;
      }
      break;
    case "v":
      if (isDrag.value) {
        horizontalDottedLeft.value = $event.pageX - leftSpacing.value;
      }
      break;
    default:
      break;
  }
}
// 虚线松开
const dottedLineUp = ($event: MouseEvent) => {
  setSpacing();
  if (isDrag.value) {
    isDrag.value = false;
    const cloneList = JSON.parse(JSON.stringify(props.presetLine));
    switch (dragFlag.value) {
      case "x":
        cloneList.push({
          type: "h",
          site:
            ($event.pageY - topSpacing.value - size.value) *
            (props.stepLength / 50),
        });
        emit("lineChange", cloneList);
        break;
      case "y":
        cloneList.push({
          type: "v",
          site:
            ($event.pageX - leftSpacing.value - size.value) *
            (props.stepLength / 50),
        });
        emit("lineChange", cloneList);
        break;
      case "h":
        dragCalc(
          cloneList,
          $event.pageY,
          topSpacing.value,
          rulerHeight.value,
          "h"
        );
        emit("lineChange", cloneList);
        break;
      case "v":
        dragCalc(
          cloneList,
          $event.pageX,
          leftSpacing.value,
          rulerWidth.value,
          "v"
        );
        emit("lineChange", cloneList);
        break;
      default:
        break;
    }
    verticalDottedTop.value = horizontalDottedLeft.value = -10;
  }
}
const dragCalc = (list: any[], page: number, spacing: number, ruler: number, type: string) => {
  if (page - spacing < ruler) {
    let Index = 0,
      id;

    lineList.value.forEach((item, index) => {
      if (item.id === dragLineId.value) {
        Index = index;
        id = item.id;
      }
    });
    list.splice(Index, 1, {
      type: type,
      site: -600,
    });
  } else {
    let Index = 0,
      id;
    lineList.value.forEach((item, index) => {
      if (item.id === dragLineId.value) {
        Index = index;
        id = item.id;
      }
    });
    list.splice(Index, 1, {
      type: type,
      site: (page - spacing - size.value) * (props.stepLength / 50),
    });
  }
}
// 水平标尺处按下鼠标
const horizontalDragRuler = () => {
  newLine("x");
}
// 垂直标尺处按下鼠标
const verticalDragRuler = () => {
  newLine("y");
}
// 水平线处按下鼠标
const dragHorizontalLine = (id: string) => {
  isDrag.value = true;
  dragFlag.value = "h";
  dragLineId.value = id;
}
// 垂直线处按下鼠标
const dragVerticalLine = (id: string) => {
  isDrag.value = true;
  dragFlag.value = "v";
  dragLineId.value = id;
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
