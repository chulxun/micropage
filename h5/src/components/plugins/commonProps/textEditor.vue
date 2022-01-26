<template>
  <editor v-model="content" :init="init" />
</template>
<script lang='ts'>
import { defineComponent, onMounted, nextTick, ref, watch } from "vue";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
// import "tinymce/themes/silver/theme"; // 引用主题文件
import "tinymce/icons/default"; // 引用图标文件
import "tinymce/plugins/link";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/fullscreen"; //全屏插件
export default defineComponent({
  props: ["text"],
  components: {
    editor: Editor,
  },
  setup(props, ctx) {
    const content = ref(props.text);
    const init = {
      theme_url: "/tinymce/silver/theme.min.js",
      language_url: "/tinymce/langs/zh_CN.js", // 中文语言包路径
      language: "zh_CN",
      skin_url: "/tinymce/skins/ui/oxide", // 编辑器皮肤样式
      content_css: "/tinymce/skins/ui/oxide/content.min.css",
      menubar: false, // 隐藏菜单栏
      height: 600,
      plugins: "link table lists fullscreen", // 插件需要import进来
      toolbar:
        "fontselect fontsizeselect styleselect lineheight forecolor backcolor numlist bullist link table removeformat fullscreen",
      content_style: "*{padding:0;margin:0;};",
      fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
      font_formats:
        "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
      branding: false, //隐藏技术支持
      elementpath: false, //隐藏底栏的元素路径
      statusbar: false, // 隐藏底部状态栏
    };
    // 监听编辑器内容变化，自定义处理内容
    watch(
      () => content.value,
      (val) => {
        ctx.emit("update:text", val);
      }
    );

    onMounted(async () => {
      await nextTick();
      tinymce.init({}); // 初始化
    });
    return { init, content };
  },
});
</script>
<style lang='less' scoped>
</style>