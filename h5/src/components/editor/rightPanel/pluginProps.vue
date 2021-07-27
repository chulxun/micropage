<template>
  <div v-if="editingElement">
    <plugEditor :element="editingElement"></plugEditor>
  </div>
  <div v-else><el-empty description="请选择一个元素进行编辑"></el-empty></div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { ElEmpty } from "element-plus";
import { useStore } from "@/store/index";
import plugEditor from "@/components/plugins/editor.vue";
export default defineComponent({
  components: {
    plugEditor,
    ElEmpty,
  },
  setup() {
    const store = useStore();
    const editingElement: any = computed(
      () => store.state.editor.editingElement
    );

    return { editingElement };
  },
  mounted() {},
});
</script>
<style lang='less' scoped>
</style>