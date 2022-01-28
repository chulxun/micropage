<template>
  <div
    :class="{ work_app: true, swiper_app: work.page_type == 2 }"
    :style="'height:' + pxToRem(pageHeight)"
  >
    <!-- 多页 -->
    <swiper
      class="swiper_pages"
      :slides-per-view="1"
      :space-between="0"
      :direction="work?.config?.swiper_direction || 'vertical'"
      :loop="work?.config?.swiper_loop || false"
      :modules="work?.config?.swiper_pag ? modules : []"
      :pagination="{ clickable: true }"
      :threshold="30"
      v-if="work.page_type == 2"
      :style="{ '--swiper-pagination-color': work?.config?.swiper_pag_color }"
      @slideChangeTransitionEnd="slideChange"
    >
      <swiper-slide class="swiper-item" v-for="page in work.pages" :key="page.ukey">
        <onePage :page="page" :pageHeight="667" />
      </swiper-slide>
      <img
        v-if="work?.config?.swiper_arrow && showArrow"
        class="swiper_arrow"
        src="/images/swiper_arrow.png"
        alt="arrow"
      />
    </swiper>
    <!-- 单页 -->
    <template v-for="page in work.pages" v-else>
      <onePage :page="page" :pageHeight="pageHeight" />
    </template>
    <div class="mode_tips" v-if="mode == 'preview'">预览模式</div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, nextTick, watch } from 'vue'
import onePage from '@/components/viewer/onePage.vue'
import { pxToRem } from '../src/utils/element'
import { getWorkPreview, getWorkDetail } from '../src/api/works'
import { Toast } from 'vant'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { useWindowSize } from '@vant/use'
import { getSearchQueryString } from '../src/utils/index'
import '@vant/touch-emulator'

const props = defineProps({
  workId: String,
  mode: String,
})
const pcUrl = ref('')
const isLoading = ref(true)
const work: any = reactive({})
const pageHeight = ref(667)
const { width, height } = useWindowSize()
const workId = getSearchQueryString('workId')
const mode = getSearchQueryString('mode')
const modules = [Pagination]
const showArrow = ref(true)  // 是否显示箭头
//监听页面尺寸变动 调整rem
watch(width, () => {
  Resize()
  console.log('window resized')
})
//获取作品详情
async function fetchWorkInfo() {
  isLoading.value = true
  let res = null
  if (mode == 'preview') {
    res = await getWorkPreview({ work_id: workId })
  } else {
    res = await getWorkDetail({ work_id: workId })
  }
  if (res && res.code == 0) {
    if (typeof window.parent.getWorkInfo == 'function') {
      window.parent.getWorkInfo(res.property) //不用localstorage，直接调用父窗口的方法，是考虑到后期可能不同源的情况
    }
    Object.assign(work, res.property)
    if (work && work.pages) {
      document.title = work.title
      if (work.pages.length === 1)
        pageHeight.value = work.pages[0].elements[0].props.pageHeight
    }
  } else {
    Toast(res.message)
  }
  isLoading.value = false
}
function Resize() {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px'
}
const slideChange = swiper => {
  const { activeIndex } = swiper
  if ((activeIndex + 1) === work.pages.length && !work?.config?.swiper_loop) {
    showArrow.value = false
  } else {
    showArrow.value = true
  }
}
onMounted(async () => {
  let width = document.body.offsetWidth
  pcUrl.value = '/pcviewer/' + workId
  if (mode) {
    pcUrl.value = pcUrl.value + '/' + mode
  }
  if (width > 750) {
    window.location.replace(pcUrl.value)
  }
  await fetchWorkInfo()
  await nextTick()
  Resize()
})
</script>
<style lang="less">
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

// 多页 样式
.swiper_pages {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .swiper-slide {
    transform: scale(1);
    .animCan {
      display: none !important;
    }
  }
  .swiper-slide-active .animCan {
    display: block !important;
    animation-fill-mode: backwards; // 动画开始前，停留在第一帧
  }
  // 提示箭头
  .swiper_arrow {
    width: 0.3rem;
    position: fixed;
    bottom: 0.2rem;
    z-index: 2;
    left: 50%;
    margin-left: -0.15rem;
    animation: arrowing 1.5s infinite linear;
  }
  &.swiper-horizontal {
    .swiper_arrow {
      left: auto;
      right: 0.1rem;
      bottom: 50%;
      margin-left: 0;
      margin-top: 0.15rem;
      animation-name: arrowRightAn;
    }
  }
}
@keyframes arrowing {
  0%,
  100% {
    transform: translateY(-5px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(10px);
    opacity: 1;
  }
}
@keyframes arrowRightAn {
  0%,
  100% {
    transform: rotate(-90deg) translateY(-5px);
    opacity: 0.8;
  }
  50% {
    transform: rotate(-90deg) translateY(10px);
    opacity: 1;
  }
}
</style>
