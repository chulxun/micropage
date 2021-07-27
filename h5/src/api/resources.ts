import { axPost, axGet } from "./request";
/** 列表 */
export function getList(params: object) {
  return axGet('/api/resources/getList', params)
}
/** 新增 */
export function addResources(params: object) {
  return axPost('/api/resources/add', params)
}
/** 删除 */
export function deleteResources(params: object) {
  return axPost('/api/resources/delete', params)
}
