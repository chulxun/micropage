<template>
  <vue-ruler-tool
    :presetLine="presetLine"
    :isScaleRevise="true"
    :visible="rulerVisible"
    @lineChange="onLineChange"
    :windowHeight="editingPageProps.pageHeight"
  ></vue-ruler-tool>
</template>
<script setup lang='ts'>
import { computed, reactive } from "vue";
import VueRulerTool from "./vue-ruler-tool/index.vue";
import { useStore } from "@/store/index";

const store = useStore();
const rulerVisible = computed(() => store.state.common.rulerVisible);
const editingPageProps: any = computed(
  () => store.state.editor.editingPageProps
);

const presetLine = reactive([]); //参考线
function onLineChange(val: any) {
  Object.assign(presetLine, val);
}
</script>
<style lang='less' scoped>
</style>