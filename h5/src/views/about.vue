<template>
  <master defaultActive="/about">
    <div class="content">关于微页</div>
  </master>
</template>
<script lang="ts">
import { ElButton } from "element-plus";
import master from "@/components/common/master.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    master,
    ElButton,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="less"  scoped>
.content {
  margin: 20px;
  background: #fff;
  min-height: calc(100% - 40px);
  border-radius: 5px;
  padding: 20px;
}
</style>