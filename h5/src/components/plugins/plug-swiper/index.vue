<template>
  <swiper
    :class="{ disabled: workMode == 'editor' }"
    :slides-per-view="1"
    :space-between="0"
    :direction="element.props.direction"
    :modules="modules"
    :pagination="
      element.props.showPage ? { clickable: true, type: element.props.pagType } : false
    "
    :autoplay="workMode === 'editor' ? false : { delay: element.props.delay || 4000 }"
    :style="{ '--swiper-pagination-color': element.props.indicatorColor }"
    v-if="ismounted"
  >
    <swiper-slide class="swiper-item" v-for="(item, index) in element.props.swiper" :key="index">
      <img :src="item" class="img" />
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { watch, ref, onMounted, nextTick } from "vue";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css'
import 'swiper/css/pagination'
const props = defineProps<{
  element: H5.Element,
  workMode: string
}>()

const modules = [Pagination, Autoplay]
const ismounted = ref(false);
//监听分页样式改变
watch(
  () => props.element.props.pagType,
  function (val) {
    //尝试直接调用swiper的方法改变type，未成功，so这里采用以下方式
    if (props.element.props.showPage) {
      props.element.props.showPage = false;
      setTimeout(() => {
        props.element.props.showPage = true;
      }, 10);
    }
  }
);
onMounted(async () => {
  await nextTick();
  ismounted.value = true
})
</script>
<style lang='less' scoped >
.disabled {
  pointer-events: none;
}
.swiper-item {
  width: 100% !important;
  height: 100% !important;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>