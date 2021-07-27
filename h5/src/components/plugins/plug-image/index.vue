<template>
  <img :src="props.imgUrl" alt="" />
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: ["props", "workMode"],
  name: "plug-image",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 120,
      height: 120,
    },
    props: {
      imgUrl: "https://public.fanjinyan.com/weiye_default_img_squre.png",
      clickType: 0,
      clickContent: "",
    },
  },
  setup(props) {
    return {};
  },
});
</script>
<style lang='less' scoped>
img {
  object-fit: cover;
}
</style>