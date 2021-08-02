<template>
  <master defaultActive="/about">
    <div class="content">
      <h2>微页 1.0</h2>
      <p>
        一个注重交互的H5编辑器开源项目，旨在提高工作效率，快速开发小型运营活动页面，以及日常H5需求。
      </p>
      <p>技术站：Vue 3 + Typescript + Vite</p>
      <p>编辑器使用的框架：element-plus</p>
      <p>作品使用的框架：vant</p>
      <p>注意：</p>
      <p>编辑器中所使用的图标库：element-plus自带、阿里巴巴图标库</p>
      <p>作品中图标库：vant自带</p>
      <p>
        github:
        <a href="https://github.com/chulxun/micropage" target="_blank"
          >https://github.com/chulxun/micropage</a
        >
      </p>

      <h2>微页 2.0开发计划</h2>
      <p>1、开发微页信息管理后台（react）</p>
      <p>2、逐步开发更多组件</p>
      <p>3、优化用户体验</p>
      <p>文档后续更新...</p>
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
  > * {
    margin-bottom: 10px;
  }
  a {
    color: var(--primaryColor);
  }
}
</style>