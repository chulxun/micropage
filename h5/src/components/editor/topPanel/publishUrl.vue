<template>
  <el-dialog
    title="发布作品成功"
    v-model="show"
    custom-class="publish_dialog"
    width="700px"
  >
    <div class="publish_content" id="publish_dialog" v-if="workId">
      <div class="note">
        <div class="title">发布作品成功</div>
        <div class="url">
          <p>作品链接：</p>
          <div>
            <a :href="mobileUrl" target="_blank">{{ mobileUrl }}</a>
          </div>
          <el-button
            type="primary"
            plain
            :data-clipboard-text="mobileUrl"
            ref="copyBtn"
            >复制链接</el-button
          >
        </div>
        <div class="url">
          <p>作品二维码：</p>
          <canvas ref="qrcodeImg"></canvas>
        </div>
      </div></div
  ></el-dialog>
</template>
<script lang='ts'>
import QRCode from "qrcode";
import ClipboardJS from "clipboard";
import {
  defineComponent,
  onMounted,
  ref,
  nextTick,
  watch,
  reactive,
} from "vue";
import { ElButton, ElDialog, ElMessage } from "element-plus";
export default defineComponent({
  props: ["workId", "publishVisible"],
  components: { ElButton, ElDialog },
  setup(props, ctx) {
    const show = ref(props.publishVisible);
    const mobileUrl = ref("");
    const qrcodeImg = ref(null); //二维码dom元素
    const copyBtn = ref(null); //复制btn元素
    const work = reactive({});
    watch(show, (val, oldval) => {
      ctx.emit("update:publishVisible", val);
    });
    onMounted(async () => {
      mobileUrl.value =
        window.location.origin + "/viewer/?workId=" + props.workId;
      await nextTick();
      drawQRcode();
      let clipboard = new ClipboardJS(copyBtn.value.$el); //这里用ref.$el取dom元素，不然复制没反应
      clipboard.on("success", (e) => {
        ElMessage.success("复制成功");
      });

      clipboard.on("error", (e) => {
        ElMessage.error("复制失败");
      });
    });

    //生成二维码
    function drawQRcode() {
      QRCode.toCanvas(
        qrcodeImg.value,
        mobileUrl.value,
        { margin: 1, scale: 4, width: 130 },
        (err: Error) => {}
      );
    }
    return { copyBtn, show, work, mobileUrl, qrcodeImg };
  },
});
</script>
<style lang='less' scoped>
.publish_content {
  .note {
    padding: 16px;
    .title {
      font-weight: bold;
      font-size: 16px;
      color: #000;
      padding: 5px 0 15px;
      border-bottom: 1px solid var(--borderColor);
    }
  }
  .url {
    padding: 20px 0 15px;
    display: flex;
    align-items: center;
    color: #000;
    p {
      flex-shrink: 0;
      width: 95px;
    }
    div {
      flex: 1;
      font-weight: bold;
    }
  }
}
</style>
<style lang="less">
.publish_dialog {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__title {
    display: none;
  }
}
</style>