<template>
  <el-upload
    :limit="10"
    :accept="accept"
    action="https://upload.qiniup.com"
    :data="uploadData"
    :before-upload="beforeUpload"
    :on-change="handleChange"
    :on-success="uploadSuccess"
    ref="upload"
  >
    <el-button type="primary" v-if="type == 1">上传图片 (jpg、png、gif、bmp)</el-button>
    <el-button type="primary" v-else-if="type == 2">上传视频 (mp4)</el-button>
    <el-button type="primary" v-else-if="type == 3">上传音乐 (mp3)</el-button>
  </el-upload>
  <video ref="video"></video>
  <canvas ref="canvas"></canvas>
</template>
<script setup lang='ts'>
import { ElButton, ElUpload, ElMessage } from "element-plus";
import { ref, reactive, watch, onMounted } from "vue";
import { addResources } from "@/api/resources";
import qiniuUpload from "@/components/support/upload/qiniuUpload";
import { cdnDomain } from "@/data/constant";

const props = defineProps({
  type: Number
})
const emit = defineEmits(['refreshData'])
const accept = ref("*");
const uploadData = reactive({ token: "", region: "ECN", key: "" });
const upload: any = ref(null);
const canvas: any = ref(null);
const video: any = ref(null);
const { token, getQiniuToken, uploadBase64Img } = qiniuUpload();
watch(
  () => props.type,
  (newval, oldval) => {
    if (newval == 1) {
      accept.value = "image/gif, image/jpeg,image/png,image/bmp";
    } else if (newval == 2) {
      accept.value = "video/mp4";
    } else if (newval == 3) {
      accept.value = "audio/mpeg";
    }
  },
  { immediate: true }
);
onMounted(async () => {
  await getQiniuToken();
  uploadData.token = token.value;
});
//上传前校验
const beforeUpload = (file: File) => {
  const isAccept = accept.value.indexOf(file.type) != -1;
  const isLt2M = file.size / 1024 / 1024 < 20;
  if (!isAccept) {
    ElMessage.error("请上传正确格式内容!");
  }
  if (!isLt2M) {
    ElMessage.error("上传内容大小不能超过 20MB!");
  }
  if (isAccept && isLt2M) {
    uploadData.key = new Date().getTime() + "--" + file.name;
    if (props.type == 2) {
      video.value.src = window.URL.createObjectURL(file);
      video.value.load();
    }
  }
  return isAccept && isLt2M;
}

//文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
const handleChange = (file: any, fileList: FileList) => {
  const status = file.status;
  if (status !== "ready") {
  }
  if (status === "success") {
    ElMessage.success(`${file.name} 上传成功`);
  } else if (status === "error") {
    ElMessage.error(`${file.name} 上传失败`);
  }
}
//上传成功后操作
const uploadSuccess = async (response: any,
  file: File,
  fileList: any) => {
  const uploadResult = fileList.filter((item: any) => {
    return item.status != "success";
  });
  if (uploadResult.length == 0) upload.value.clearFiles();
  let url = cdnDomain + response.key;
  if (props.type == 1) {
    url += "?imageView2/0/w/750/q/75";
  }
  let params: any = {
    url: url,
    size: file.size / 1000 + "kb",
    type: props.type,
  };
  if (props.type == 2) {
    //截取一帧视频当封面
    var ctx2 = canvas.value.getContext("2d");
    canvas.value.width = video.value.videoWidth;
    canvas.value.height = video.value.videoHeight;
    ctx2.drawImage(video.value, 0, 0);
    let url = canvas.value.toDataURL("image/png");
    let preview_url = await uploadBase64Img(url, "videoscreen.jpg");
    params.preview_url = preview_url;
  }
  let res = await addResources(params);
  if (res && res.code == 0) {
    emit("refreshData");
  } else {
    ElMessage.error(res.message);
  }
}
</script>
<style lang='less' scoped>
:deep(.el-upload-list__item-name) {
  text-align: left;
}
video,
canvas {
  position: absolute;
  z-index: -1;
  pointer-events: none;
  opacity: 0;
}
</style>