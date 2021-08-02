<template>
  <van-tabs
    v-model:active="active"
    :color="props.color"
    :background="props.background"
    :type="props.type"
    :animated="props.animated"
    :sticky="props.sticky"
    :title-active-color="props.titleActiveColor"
    :title-inactive-color="props.titleInactiveColor"
    ref="tabs"
  >
    <van-tab
      :title="item.title"
      v-for="(item, index) in props.options"
      :key="index"
      ><div class="text" :style="conStyle" v-html="item.content"></div
    ></van-tab>
  </van-tabs>
</template>
<script lang="ts">
import {
  computed,
  watch,
  defineComponent,
  ref,
  onMounted,
  nextTick,
} from "vue";
import { Tab, Tabs } from "vant";
import { pxToRem } from "@/utils/element";
export default defineComponent({
  props: ["props", "workMode"],
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  name: "plug-tabs",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 375,
      height: 400,
      left: 0,
      top: 100,
      backgroundColor: "#fff",
    },
    props: {
      color: "#ee0a24",
      background: "#fff",
      titleInactiveColor: "",
      titleActiveColor: "",
      type: "line",
      animated: false,
      sticky: false,
      active: 0,
      padding: 10,
      options: [
        { title: "标签一", content: "内容一" },
        { title: "标签二", content: "内容二" },
        { title: "标签三", content: "内容三" },
      ],
    },
  },
  setup(props) {
    const active = ref(props.props.active);
    watch(
      () => props.props.active,
      function (val) {
        active.value = val;
      }
    );
    const tabs = ref(null);
    //提取属性中设置的样式
    const conStyle = computed(() => {
      const isRem = props.workMode.value == "formal" ? true : false;
      let style = { padding: 0 };
      style.padding = isRem
        ? pxToRem(props.props.padding)
        : props.props.padding + "px";
      return style;
    });
    onMounted(async () => {
      await nextTick();
      //这里主动触发重绘，防止底部条位置错误
      tabs.value.resize();
    });
    return { tabs, conStyle, active };
  },
});
</script>
<style lang='less' scoped>
.text {
  word-break: break-all;
}
</style>