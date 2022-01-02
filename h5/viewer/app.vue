<template>
  <div
    :class="{ work_app: true, swiper_app: work.page_type == 2 }"
    :style="'height:' + pxToRem(pageHeight)"
  >
    <!-- 多页 -->
    <swiper
      class="swiper"
      :slides-per-view="1"
      :space-between="0"
      direction="vertical"
      :modules="modules"
      :pagination="{ clickable: true }"
      :threshold="30"
      v-if="work.page_type == 2"
    >
      <swiper-slide class="swiper-item" v-for="page in work.pages" :key="page.ukey">
        <div
          v-for="item in page.elements"
          :key="item.ukey"
          :style="getElementStyle(item.style, true, pageHeight)"
        >
          <animation :element="item" v-if="!item.props.hide">
            <element :element="item"></element>
          </animation>
        </div>
      </swiper-slide>
    </swiper>
    <!-- 单页 -->
    <template v-for="page in work.pages" v-else>
      <div
        v-for="item in page.elements"
        :key="item.ukey"
        :style="getElementStyle(item.style, true, pageHeight)"
      >
        <animation :element="item" v-if="!item.props.hide">
          <element :element="item"></element>
        </animation>
      </div>
    </template>
    <div class="mode_tips" v-if="mode == 'preview'">预览模式</div>
  </div>
</template>
<script  lang='ts'>
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  nextTick,
  watch,
} from "vue";
import element from "@/components/plugins/element.vue";
import animation from "@/components/common/animation.vue";
import { getElementStyle, pxToRem } from "../src/utils/element";
import { getWorkPreview, getWorkDetail } from "../src/api/works";
import { Toast } from "vant";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css'
import 'swiper/css/pagination'
import { useWindowSize } from "@vant/use";
import { getSearchQueryString } from "../src/utils/index";
import "@vant/touch-emulator";
export default defineComponent({
  props: ["workId", "mode"],
  components: {
    element,
    animation,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const pcUrl = ref("");
    const isLoading = ref(true);
    const work = reactive({});
    const pageHeight = ref(667);
    const { width, height } = useWindowSize();
    const workId = getSearchQueryString("workId");
    const mode = getSearchQueryString("mode");
    const modules = [Pagination]
    //监听页面尺寸变动 调整rem
    watch(width, () => {
      Resize();
      console.log("window resized");
    });
    //获取作品详情
    async function fetchWorkInfo() {
      isLoading.value = true;
      let res = null;
      if (mode == "preview") {
        res = await getWorkPreview({ work_id: workId });
      } else {
        res = await getWorkDetail({ work_id: workId });
      }
      if (res && res.code == 0) {
        if (typeof window.parent.getWorkInfo == "function") {
          window.parent.getWorkInfo(res.property); //不用localstorage，直接调用父窗口的方法，是考虑到后期可能不同源的情况
        }

        Object.assign(work, res.property);
        if (work && work.pages && work.pages.length > 0) {
          document.title = work.title;
          pageHeight.value = work.pages[0].elements[0].props.pageHeight;
        }
      } else {
        Toast(res.message);
      }
      isLoading.value = false;
    }
    function Resize() {
      document.documentElement.style.fontSize =
        document.documentElement.clientWidth / 3.75 + "px";
    }
    onMounted(async () => {
      let width = document.body.offsetWidth;
      pcUrl.value = "/pcviewer/" + workId;
      if (mode) {
        pcUrl.value = pcUrl.value + "/" + mode;
      }
      if (width > 750) {
        window.location.replace(pcUrl.value);
      }
      await fetchWorkInfo();
      await nextTick();
      Resize();

      //监听单页面的动画滚动
      if (work.page_type == 2) return;
      var animElements =
        Array.from(document.querySelectorAll(".animCan")) || [];
      if (animElements.length > 0) {
        handleScroll();
        window.addEventListener("scroll", scrollEvent, false);
      }
      function scrollEvent() {
        throttle(handleScroll);
      }
      function handleScroll() {
        animElements = Array.from(document.querySelectorAll(".animCan"));
        //没有动画元素时，移除滚动事件
        if (animElements.length == 0) {
          window.removeEventListener("scroll", scrollEvent);
        }
        for (var i = 0; i < animElements.length; i++) {
          var elem = animElements[i];
          if (isElemVisible(elem)) {
            elem.classList.remove("animCan");
          }
        }
      }
      function isElemVisible(el) {
        let s = el.parentNode.offsetTop; // 元素相对于页面顶部的距离
        let x = el.parentNode.offsetHeight; //元素自身高度
        let t = window.pageYOffset; // 页面在垂直方向上滚动的距离
        let y = window.innerHeight; //窗口可视区域的高度
        let isHidden = s + x < t || s > t + y;
        return !isHidden;
      }
      //节流函数
      function throttle(method, context) {
        clearTimeout(method.tId);
        method.tId = setTimeout(function () {
          method.call(context);
        }, 200);
      }
    });
    return { mode, workId, pageHeight, modules, pcUrl, pxToRem, work, getElementStyle };
  },
});
</script>
<style lang='less'>
@import "@/css/reset.less";
.work_app {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}
.swiper_app {
  max-height: 100vh;
}
.mode_tips {
  position: fixed;
  z-index: 500;
  top: 15px;
  right: 15px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 13px;
  padding: 5px 10px;
}

.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide-active .animCan {
  animation-play-state: running;
}
</style>