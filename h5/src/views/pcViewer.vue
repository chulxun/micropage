<template>
  <div class="pc_container">
    <div class="mobile_wrapper">
      <iframe
        :src="mobileUrl"
        frameborder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
    <div class="qrcode">
      <div class="title">手机扫描二维码，效果更佳</div>
      <canvas ref="qrcodeImg"></canvas>
    </div>
  </div>
</template>
<script lang='ts'>
import QRCode from "qrcode";
import { defineComponent, ref, onMounted, nextTick } from "vue";
export default defineComponent({
  props: ["workId", "mode"],
  components: {},
  setup(props) {
    const mobileUrl = ref("");
    const qrcodeImg = ref(null); //二维码dom元素
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
      window.getWorkInfo = (val: object) => {
        document.title = val.title;
      };
    });
    //生成二维码
    function drawQRcode() {
      QRCode.toCanvas(
        qrcodeImg.value,
        window.location.origin + mobileUrl.value,
        { margin: 1, scale: 4, width: 150 },
        (err: Error) => {}
      );
    }
    return { mobileUrl, qrcodeImg };
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
  .qrcode {
    background: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 12px;
    border-radius: 5px;
    margin-left: 15px;
    margin-bottom: 30vh;
    .title {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 12px;
    }
    img {
      width: 160px;
      height: 160px;
    }
  }
}
</style>