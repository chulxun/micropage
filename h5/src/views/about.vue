<template>
  <master defaultActive="/about">
    <div class="content">
      <h2>微页 1.0</h2>
      <p>
        一个注重交互的H5编辑器开源项目，旨在提高工作效率，快速开发小型运营活动页面，以及日常H5需求。
      </p>
      <p>技术站：Vue 3 + Typescript + Vite</p>
      <p>
        github:
        <a href="https://github.com/chulxun/micropage" target="_blank"
          >https://github.com/chulxun/micropage</a
        >
      </p>
    </div>
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