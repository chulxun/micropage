<template>
  <div class="pc_container">
    <div class="mobile_wrapper">
      <iframe :src="mobileUrl" frameborder="0" width="100%" height="100%"></iframe>
    </div>
    <div class="right_info">
      <div class="box">
        <div class="share" v-if="work.title">
          <div class="title">{{ work.title }}</div>
          <div class="flex">
            <img :src="work.share_img_url" />
            <p>{{ work.description }}</p>
          </div>
        </div>
      </div>
      <div class="qrcode box">
        <div class="title">手机扫描二维码，效果更佳</div>
        <canvas ref="qrcodeImg"></canvas>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import QRCode from "qrcode";
import { defineComponent, ref, reactive, onMounted, nextTick } from "vue";
export default defineComponent({
  props: ["workId", "mode"],
  components: {},
  setup(props) {
    const mobileUrl = ref("");
    const qrcodeImg = ref(null); //二维码dom元素
    const work = reactive({})
    onMounted(async () => {
      let width = document.body.offsetWidth;
      mobileUrl.value = "/viewer/?workId=" + props.workId;
      if (props.mode) {
        mobileUrl.value = mobileUrl.value + "&mode=" + props.mode;
      }
      if (width <= 750) {
        window.location.replace(mobileUrl.value);
        return;
      }
      await nextTick();
      drawQRcode();
      //定义一个方法，获取作品信息
      window.getWorkInfo = (val: H5.WorkInfo) => {
        document.title = val.title;
        Object.assign(work, val);
      };
    });
    //生成二维码
    function drawQRcode() {
      QRCode.toCanvas(
        qrcodeImg.value,
        window.location.origin + mobileUrl.value,
        { margin: 1, scale: 4, width: 150 },
        (err: Error) => { }
      );
    }
    return { work, mobileUrl, qrcodeImg };
  },
});
</script>
<style lang='less' scoped>
.pc_container {
  background: #f2f2f2;
  width: 100vw;
  height: 100vh;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .mobile_wrapper {
    height: 100%;
    width: calc((100vh - 60px) * 375 / 667);
    background: #fff;
    border-radius: 5px;
    padding: 10px;
  }
  .right_info {
    margin-left: 30px;
    .box {
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      padding: 10px;
      border-radius: 5px;
      width: 230px;
      margin-bottom: 16px;
      .title {
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 14px;
        text-align: center;
      }
    }
    .share {
      word-break: break-all;
      padding: 10px;
      background: #f2f2f2;
      .title {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .flex {
        display: flex;
      }
      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        margin-right: 10px;
        border-radius: 2px;
      }
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
    .qrcode {
      // width: 200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      .qrcode_img {
        width: 170px;
      }
    }
  }
}
</style>