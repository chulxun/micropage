import { axPost, axGet } from "./request";
/** 登录 */
export function login(params: object) {
  return axPost('/api/user/login', params)
}
/** 修改密码 */
export function changePwd(params: object) {
  return axPost('/api/user/changePwd', params)
}
/** 修改信息 */
export function editUserInfo(params: object) {
  return axPost('/api/user/editUserInfo', params)
}