<template>
  <div><el-empty description="开发中，下个版本见"></el-empty></div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { ElEmpty, ElForm, ElFormItem, ElInput } from "element-plus";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    ElEmpty,
    ElForm,
    ElFormItem,
    ElInput,
  },
  data() {
    return {
      value: "",
    };
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