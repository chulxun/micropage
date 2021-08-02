<template>
  <van-notice-bar
    :scrollable="props.type == 'scrollable'"
    :wrapable="props.type == 'wrapable'"
    :left-icon="props.icon"
    :mode="props.mode"
    background="transparent"
  >
    {{ props.text }}
  </van-notice-bar>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { NoticeBar } from "vant";
export default defineComponent({
  props: ["props", "workMode"],
  name: "plug-noticebar",
  components: {
    [NoticeBar.name]: NoticeBar,
  },
  //默认组件 参数
  defaultElement: {
    style: {
      width: 375,
      height: 40,
      left: 0,
      top: 0,
      backgroundColor: "#fff7cc",
      borderRadius: 3,
      color: "#f60",
      fontSize: 14,
      borderColor: "#fff",
      borderWidth: 0,
      fontWeight: "normal",
      padding: 10,
    },
    props: {
      text: "这是一条超长长长长长长长长长长长的示例通知文案，你也来试试吧！",
      icon: "volume-o",
      mode: "",
      type: "scrollable",
      clickType: 0,
      clickContent: "",
    },
  },
  setup(props) {},
});
</script>
<style lang='less' scoped>
:deep(.van-notice-bar__wrap) {
  background-color: transparent;
}
:deep(.van-notice-bar__content) {
  color: inherit;
}
</style>