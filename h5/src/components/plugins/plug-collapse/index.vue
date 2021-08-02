<template>
  <van-collapse v-model="active" :accordion="props.accordion">
    <van-collapse-item
      :title="item.title"
      v-for="(item, index) in props.options"
      :key="index"
      :name="index"
      :icon="item.icon"
      ><div class="text" :style="conStyle" v-html="item.content"></div
    ></van-collapse-item>
  </van-collapse>
</template>
<script lang="ts">
import { computed, watch, defineComponent, ref } from "vue";
import { Collapse, CollapseItem } from "vant";
import { pxToRem } from "@/utils/element";
export default defineComponent({
  props: ["props", "workMode"],
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
  },
  name: "plug-collapse",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 375,
      height: 180,
      left: 0,
      top: 100,
      backgroundColor: "#fff",
    },
    props: {
      accordion: false,
      active: [0],
      options: [
        { title: "标题一", icon: "", content: "内容一" },
        { title: "标题二", icon: "", content: "内容二" },
        { title: "标题三", icon: "", content: "内容三" },
      ],
    },
  },
  setup(props) {
    const active = ref("");
    watch(
      [() => props.props.active, () => props.props.accordion],
      function () {
        if (props.props.accordion && props.props.active.length > 0) {
          active.value = props.props.active[0];
        } else {
          active.value = props.props.active;
        }
      },
      {
        immediate: true,
      }
    );

    //提取属性中设置的样式
    const conStyle = computed(() => {
      const isRem = props.workMode.value == "formal" ? true : false;
      let style = { padding: 0 };
      style.padding = isRem
        ? pxToRem(props.props.padding)
        : props.props.padding + "px";
      return style;
    });
    // onMounted(async () => {
    //   await nextTick();
    //   //这里主动触发重绘，防止底部条位置错误
    //   tabs.value.resize();
    // });
    return { conStyle, active };
  },
});
</script>
<style lang='less' scoped>
.text {
  word-break: break-all;
}
</style>