import { axPost, axGet } from "./request";
/** 获取七牛云token */
export function getToken() {
  return axPost('/api/common/getQiniuToken')
}