<template>
  <swiper
    :class="{ disabled: workMode == 'editor' }"
    :slides-per-view="1"
    :space-between="0"
    :direction="props.direction"
    :pagination="
      props.showPage ? { clickable: true, type: props.pagType } : false
    "
    :autoplay="props.autoplay && workMode == 'formal' ? true : false"
  >
    <swiper-slide
      class="swiper-item"
      v-for="(item, index) in props.swiper"
      :key="index"
    >
      <img :src="item" class="img"
    /></swiper-slide>
  </swiper>
</template>
<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
SwiperCore.use([Pagination, Autoplay]);
export default defineComponent({
  props: ["props", "workMode"],
  components: {
    Swiper,
    SwiperSlide,
  },
  name: "plug-swiper",
  //默认组件 参数
  defaultElement: {
    style: {
      width: 375,
      height: 200,
      left: 0,
      top: 0,
    },
    props: {
      swiper: [
        "https://public.fanjinyan.com/weiye_default_img_width.png",
        "https://public.fanjinyan.com/weiye_default_img_width.png",
      ],
      direction: "horizontal",
      autoplay: true,
      delay: 4000,
      showPage: true,
      pagType: "bullets",
      indicatorColor: "#3981EB",
    },
  },
  setup(props) {
    const activeColor = ref("");

    //监听分页颜色设置
    watch(
      () => props.props.indicatorColor,
      function (val) {
        activeColor.value = val;
      },
      {
        immediate: true,
      }
    );
    //监听分页样式改变
    watch(
      () => props.props.pagType,
      function (val) {
        //尝试直接调用swiper的方法改变type，未成功，so这里采用以下方式
        if (props.props.showPage) {
          props.props.showPage = false;
          setTimeout(() => {
            props.props.showPage = true;
          }, 10);
        }
      }
    );

    return { activeColor };
  },
});
</script>
<style lang='less' scoped >
.disabled {
  pointer-events: none;
}
.swiper-item {
  height: 100% !important;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-container {
  --swiper-pagination-color: v-bind(activeColor);
}
</style>