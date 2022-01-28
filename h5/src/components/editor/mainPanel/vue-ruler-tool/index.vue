<template>
  <div :style="wrapperStyle" class="vue-ruler-wrapper" onselectstart="return false;">
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

<script>
import { on, off } from "./event.js";
export default {
  name: "VRuler",
  components: {},
  props: {
    presetLine: {
      type: Array,
      default: () => {
        return []; // { type: 'h', site: 50 }, { type: 'v', site: 180 }
      },
    }, // 预置参考线
    visible: {
      type: Boolean,
      default: true,
    },
    stepLength: {
      type: Number,
      default: 50,
      validator: (val) => val % 10 === 0,
    }, // 步长
    windowHeight: {
      type: Number,
      default: 667,
    }, // 页面高度
  },
  data() {
    return {
      size: 17,
      left_top: 18, // 内容左上填充
      windowWidth: 393, // 窗口宽度
      xScale: [], // 水平刻度
      yScale: [], // 垂直刻度
      topSpacing: 0, // 标尺与窗口上间距
      leftSpacing: 0, //  标尺与窗口左间距
      isDrag: false,
      dragFlag: "", // 拖动开始标记，可能值x(从水平标尺开始拖动),y(从垂直标尺开始拖动)
      horizontalDottedLeft: -999, // 水平虚线位置
      verticalDottedTop: -999, // 垂直虚线位置
      rulerWidth: 0, // 垂直标尺的宽度
      rulerHeight: 0, // 水平标尺的高度
      dragLineId: "", // 被移动线的ID
      rulerToggle: true, // 标尺辅助线显示开关
    };
  },
  computed: {
    wrapperStyle() {
      return {
        width: this.windowWidth + "px",
        height: this.windowHeight + 18 + "px",
        position: "absolute",
        top: "-18px",
        left: "-18px",
      };
    },
    lineList() {
      let hCount = 0;
      let vCount = 0;
      return this.presetLine.map((item) => {
        const isH = item.type === "h";
        return {
          id: `${item.type}_${isH ? hCount++ : vCount++}`,
          type: item.type,
          title: item.site.toFixed(2) + "px",
          [isH ? "top" : "left"]:
            item.site / (this.stepLength / 50) + this.size,
        };
      });
    },
  },
  watch: {
    visible: {
      handler(visible) {
        this.rulerToggle = visible;
      },
      immediate: true,
    },
    windowHeight: {
      handler(val) {
        this.xScale = [];
        this.yScale = [];
        this.scaleCalc();
      },
    },
  },
  mounted() {
    on(document, "mousemove", this.dottedLineMove);
    on(document, "mouseup", this.dottedLineUp);
    this.init();
  },
  beforeDestroy() {
    off(document, "mousemove", this.dottedLineMove);
    off(document, "mouseup", this.dottedLineUp);
  },
  methods: {
    init() {
      this.box();
      this.scaleCalc();
    },

    getLineStyle({ type, top, left }) {
      return type === "h" ? { top: top + "px" } : { left: left + "px" };
    },
    handleDragLine({ type, id }) {
      return type === "h"
        ? this.dragHorizontalLine(id)
        : this.dragVerticalLine(id);
    },
    box() {
      // if (this.isScaleRevise) {
      //   // 根据内容部分进行刻度修正
      //   const content = this.$refs.content;
      //   const contentLeft = content.offsetLeft;
      //   const contentTop = content.offsetTop;

      //   this.getCalcRevise(this.xScale, contentLeft);
      //   this.getCalcRevise(this.yScale, contentTop);
      // }
      this.rulerWidth = this.$refs.verticalRuler.clientWidth;
      this.rulerHeight = this.$refs.horizontalRuler.clientHeight;
      this.setSpacing();
    }, // 获取窗口宽与高
    setSpacing() {
      if (this.$refs.horizontalRuler) {
        this.topSpacing = this.$refs.horizontalRuler.getBoundingClientRect().y; //.offsetParent.offsetTop
      }
      if (this.$refs.verticalRuler) {
        this.leftSpacing = this.$refs.verticalRuler.getBoundingClientRect().x; // .offsetParent.offsetLeft
      }
    },
    scaleCalc() {
      this.getCalc(this.xScale, this.windowWidth);
      this.getCalc(this.yScale, this.windowHeight);
    }, // 计算刻度
    getCalc(array, length) {
      for (
        let i = 0;
        i < (length * this.stepLength) / 50;
        i += this.stepLength
      ) {
        if (i % this.stepLength === 0) {
          array.push({ id: i });
        }
      }
    }, // 获取刻度方法
    getCalcRevise(array, length) {
      for (let i = 0; i < length; i += 1) {
        if (i % this.stepLength === 0 && i + this.stepLength <= length) {
          array.push({ id: i });
        }
      }
    }, // 获取矫正刻度方法
    newLine(val) {
      this.isDrag = true;
      this.dragFlag = val;
    }, // 生成一个参考线
    dottedLineMove($event) {
      this.setSpacing();
      switch (this.dragFlag) {
        case "x":
          if (this.isDrag) {
            this.verticalDottedTop = $event.pageY - this.topSpacing;
          }
          break;
        case "y":
          if (this.isDrag) {
            this.horizontalDottedLeft = $event.pageX - this.leftSpacing;
          }
          break;
        case "h":
          if (this.isDrag) {
            this.verticalDottedTop = $event.pageY - this.topSpacing;
          }
          break;
        case "v":
          if (this.isDrag) {
            this.horizontalDottedLeft = $event.pageX - this.leftSpacing;
          }
          break;
        default:
          break;
      }
    }, // 虚线移动
    dottedLineUp($event) {
      this.setSpacing();
      if (this.isDrag) {
        this.isDrag = false;
        const cloneList = JSON.parse(JSON.stringify(this.presetLine));
        switch (this.dragFlag) {
          case "x":
            cloneList.push({
              type: "h",
              site:
                ($event.pageY - this.topSpacing - this.size) *
                (this.stepLength / 50),
            });
            this.$emit("lineChange", cloneList);
            break;
          case "y":
            cloneList.push({
              type: "v",
              site:
                ($event.pageX - this.leftSpacing - this.size) *
                (this.stepLength / 50),
            });
            this.$emit("lineChange", cloneList);
            break;
          case "h":
            this.dragCalc(
              cloneList,
              $event.pageY,
              this.topSpacing,
              this.rulerHeight,
              "h"
            );
            this.$emit("lineChange", cloneList);
            break;
          case "v":
            this.dragCalc(
              cloneList,
              $event.pageX,
              this.leftSpacing,
              this.rulerWidth,
              "v"
            );
            this.$emit("lineChange", cloneList);
            break;
          default:
            break;
        }
        this.verticalDottedTop = this.horizontalDottedLeft = -10;
      }
    }, // 虚线松开
    dragCalc(list, page, spacing, ruler, type) {
      if (page - spacing < ruler) {
        let Index = 0,
          id;

        this.lineList.forEach((item, index) => {
          if (item.id === this.dragLineId) {
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
        this.lineList.forEach((item, index) => {
          if (item.id === this.dragLineId) {
            Index = index;
            id = item.id;
          }
        });
        list.splice(Index, 1, {
          type: type,
          site: (page - spacing - this.size) * (this.stepLength / 50),
        });
      }
    },
    horizontalDragRuler() {
      this.newLine("x");
    }, // 水平标尺处按下鼠标
    verticalDragRuler() {
      this.newLine("y");
    }, // 垂直标尺处按下鼠标
    dragHorizontalLine(id) {
      this.isDrag = true;
      this.dragFlag = "h";
      this.dragLineId = id;
    }, // 水平线处按下鼠标
    dragVerticalLine(id) {
      this.isDrag = true;
      this.dragFlag = "v";
      this.dragLineId = id;
    }, // 垂直线处按下鼠标
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
