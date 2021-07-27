import { axPost, axGet } from "./request";
/** 获取全部数据 */
export function getList(params: object) {
  return axGet('/api/form/getList', params)
}
/** 提交表单 */
export function submitData(params: object) {
  return axPost('/api/form/submitData', params)
}
/** 作品下的表单列表 */
export function getFormDataByWork(params: object) {
  return axGet('/api/form/getFormDataByWork', params)
}
/** 导出作品下的表单 */
export function exportFormByWork(params: object) {
  return axPost('/api/form/exportFormByWork', params, { responseType: 'blob' })
}
