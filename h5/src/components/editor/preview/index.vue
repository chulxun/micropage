<template>
  <el-dialog title="作品预览" v-model="previewShow" custom-class="preview_dialog" width="700px">
    <div class="preview_content" v-if="workId && work">
      <div class="preview">
        <iframe :src="mobileUrl" frameborder="0" width="375px" height="667px"></iframe>
      </div>
      <div class="note">
        <div class="title">作品信息</div>
        <div class="share" v-if="work?.title">
          <div class="tt">{{ work?.title }}</div>
          <div class="flex">
            <img :src="work?.share_img_url" />
            <p>{{ work?.description }}</p>
          </div>
        </div>
        <div class="qrcode">
          <div class="tt">扫码预览</div>
          <canvas ref="qrcodeImg"></canvas>
          <div>
            <a :href="mobileUrl" target="_blank">
              <el-icon>
                <top-right />
              </el-icon>打开新页面预览
            </a>
          </div>
        </div>
        <template v-if="!work?.is_template && !isPublished && route.name.indexOf('Editor') !== -1">
          <div class="tips">您的作品有新内容未发布，发布后所有人才能看到哦</div>
          <el-button type="primary" @click="onPublish">立即发布</el-button>
        </template>
      </div>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import QRCode from "qrcode";
import {
  defineComponent,
  onMounted,
  ref,
  nextTick,
  watch,
  reactive,
} from "vue";
import { ElButton, ElDialog, ElLoading, ElMessage, ElIcon } from "element-plus";
import { TopRight } from '@element-plus/icons-vue'
import { formatDate } from "@/utils/index";
import { publishWork } from "@/api/works";
import { useRoute } from "vue-router";
export default defineComponent({
  props: ["workId", "previewVisible"],
  components: { ElButton, ElDialog, ElIcon, TopRight },
  setup(props, ctx) {
    const route = useRoute();
    console.log(route.name)
    const previewShow = ref(props.previewVisible);
    const mobileUrl = ref("");
    const qrcodeImg = ref(null); //二维码dom元素
    const work: H5.WorkInfo = reactive({});
    const isPublished = ref(false) // 作品是否已发布
    watch(previewShow, (val, oldval) => {
      ctx.emit("update:previewVisible", val);
    });
    watch(work, (val, oldval) => {
      if (encodeURIComponent(JSON.stringify(val.pages)) === val.publish_pages
        && encodeURIComponent(JSON.stringify(val.config)) === val.publish_config) {
        isPublished.value = true
      } else {
        isPublished.value = false
      }
    })
    onMounted(async () => {
      mobileUrl.value = "/viewer/?workId=" + props.workId + "&mode=preview";
      await nextTick();
      drawQRcode();
      //定义一个方法，获取作品信息
      window.getWorkInfo = (val: object) => {
        console.log(val)
        Object.assign(work, val);
      };
    });
    //生成二维码
    function drawQRcode() {
      QRCode.toCanvas(
        qrcodeImg.value,
        window.location.origin + mobileUrl.value,
        { margin: 1, scale: 4, width: 130 },
        (err: Error) => { }
      );
    }
    //发布作品
    async function onPublish() {
      let loading = ElLoading.service({ fullscreen: true });
      const res = await publishWork({
        work_id: props.workId,
      });
      loading.close();
      if (res && res.code == 0) {
        ElMessage.success("作品发布成功");
      } else {
        ElMessage.error(res.message);
      }
    }
    return { previewShow, work, isPublished, mobileUrl, qrcodeImg, formatDate, onPublish, route };
  },
});
</script>
<style lang='less' scoped>
.preview_content {
  display: flex;
  .preview {
    padding: 12px;
    background: #f1f1f1;
  }
  .note {
    padding: 16px;
    flex: 1;
    .title {
      font-weight: bold;
      font-size: 16px;
      color: #000;
      padding: 5px 0 15px;
      border-bottom: 1px solid var(--borderColor);
    }
  }
  .share {
    word-break: break-all;
    padding: 10px;
    background: #f2f2f2;
    margin: 15px 0;
    .tt {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: bold;
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
      font-size: 12px;
    }
  }
  .qrcode {
    padding: 30px 0;
    border-bottom: 1px dashed var(--borderColor);
    border-top: 1px dashed var(--borderColor);
    .tt {
      font-weight: bold;
      font-size: 14px;
      color: #000;
      padding-bottom: 10px;
    }
    a {
      padding-top: 10px;
      display: inline-block;
      color: var(--primaryColor);
    }
  }
  .tips {
    padding: 14px 0;
    font-size: 12px;
  }
}
</style>
<style lang="less">
.preview_dialog {
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