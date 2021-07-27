import { getToken } from "@/api/common";
import { axPost } from "@/api/request";
import { ref } from 'vue';
import { cdnDomain } from "@/utils/constant";
export default function () {
  const token = ref(''); //qiniu token
  //获取七牛云token
  async function getQiniuToken() {
    const res = await getToken();
    if (
      res &&
      res.code == 0 &&
      res.property &&
      res.property.token
    ) {
      token.value = res.property.token;
    }
  }
  // 上传base64到七牛云
  async function uploadBase64Img(base64: string, filename: string) {
    const pic = base64.replace("data:image/png;base64,", ""); //base64后的字符串
    var key = await window.btoa(
      new Date().getTime() + "--" + filename
    );
    var res = await axPost(
      "https://upload.qiniup.com/putb64/-1/key/" + key,
      pic,
      {
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: "UpToken " + token.value,
        },
      },
      true
    );
    if (res && res.key) {
      return cdnDomain + res.key;
    }
  }
  return { token, getQiniuToken, uploadBase64Img }

}