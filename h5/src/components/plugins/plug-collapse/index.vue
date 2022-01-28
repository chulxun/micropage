<template>
  <Collapse v-model="active" :accordion="element.props.accordion">
    <CollapseItem
      :title="item.title"
      v-for="(item, index) in element.props.options"
      :key="index"
      :name="index"
      :icon="item.icon"
    >
      <div class="text" :style="conStyle" v-html="item.content"></div>
    </CollapseItem>
  </Collapse>
</template>
<script setup lang="ts">
import { computed, watch, ref } from "vue";
import { Collapse, CollapseItem } from "vant";
import { pxToRem } from "@/utils/element";
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()
const active = ref("");
watch(
  [() => props.element.props?.active, () => props.element.props.accordion],
  function () {
    if (props.element.props.accordion && props.element.props.active.length > 0) {
      active.value = props.element.props.active[0];
    } else {
      active.value = props.element.props.active;
    }
  },
  {
    immediate: true,
  }
);

//提取属性中设置的样式
const conStyle = computed(() => {
  const isRem = props.workMode == "formal" ? true : false;
  let style = { padding: '0' };
  style.padding = isRem
    ? pxToRem(props.element.props.padding)
    : props.element.props.padding + "px";
  return style;
});

</script>
<style lang='less' scoped>
.text {
  word-break: break-all;
}
</style>