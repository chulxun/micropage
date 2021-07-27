<template>
  <vue-ruler-tool
    :presetLine="presetLine"
    :isScaleRevise="true"
    :visible="rulerVisible"
    @lineChange="onLineChange"
    :windowHeight="editingPageProps.pageHeight"
  >
  </vue-ruler-tool>
</template>
<script lang='ts'>
import { computed, defineComponent, reactive } from "vue";
import VueRulerTool from "./vue-ruler-tool/index.vue";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    VueRulerTool,
  },
  setup() {
    const store = useStore();
    const rulerVisible = computed(() => store.state.common.rulerVisible);
    const editingPageProps: any = computed(
      () => store.state.editor.editingPageProps
    );

    const presetLine = reactive([]); //参考线
    function onLineChange(val) {
      Object.assign(presetLine, val);
    }

    return {
      editingPageProps,
      presetLine,
      rulerVisible,
      onLineChange,
    };
  },
});
</script>
<style lang='less' scoped>
</style>