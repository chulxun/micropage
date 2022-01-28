<template>
  <Tabs
    v-model:active="active"
    :color="element.props.color"
    :background="element.props.background"
    :type="element.props.type"
    :animated="element.props.animated"
    :sticky="element.props.sticky"
    :title-active-color="element.props.titleActiveColor"
    :title-inactive-color="element.props.titleInactiveColor"
    ref="tabs"
  >
    <Tab :title="item.title" v-for="(item, index) in element.props.options" :key="index">
      <div class="text" :style="conStyle" v-html="item.content"></div>
    </Tab>
  </Tabs>
</template>
<script setup lang="ts">
import {
  computed,
  watch,
  ref,
  onMounted,
  nextTick,
} from "vue";
import { Tab, Tabs } from "vant";
import { pxToRem } from "@/utils/element";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const active = ref(props.element.props.active);
watch(
  () => props.element.props.active,
  function (val) {
    active.value = val;
  }
);
const tabs: any = ref(null);
//提取属性中设置的样式
const conStyle = computed(() => {
  const isRem = props.workMode == "formal" ? true : false;
  let style = { padding: '0' };
  style.padding = isRem
    ? pxToRem(props.element.props?.padding)
    : props.element.props?.padding + "px";
  return style;
});
onMounted(async () => {
  await nextTick();
  //这里主动触发重绘，防止底部条位置错误
  tabs.value.resize();
});

</script>
<style lang='less' scoped>
.text {
  word-break: break-all;
}
</style>