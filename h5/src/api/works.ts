import { axPost, axGet } from "./request";

/** 获取作品列表 */
export function getWorksList(params: object) {
  return axGet('/api/works/getWorksList', params)
}
/** 获取全部模版列表 */
export function getTemplateWorksList(params: object) {
  return axGet('/api/works/getTemplateWorksList', params)
}
/** 创建作品 */
export function createWork(params: object) {
  return axPost('/api/works/createWork', params)
}
/** 作品编辑详情 */
export function getWorkInfo(params: object) {
  return axGet('/api/works/getWorkInfo', params)
}
/** 作品预览 */
export function getWorkPreview(params: object) {
  return axGet('/api/works/getWorkPreview', params)
}
/** 发布后作品详情 */
export function getWorkDetail(params: object) {
  return axGet('/api/works/getWorkDetail', params)
}
/** 修改作品 */
export function updateWork(params: object) {
  return axPost('/api/works/updateWork', params)
}
/** 删除作品 */
export function deleteWork(params: object) {
  return axPost('/api/works/deleteWork', params)
}
/** 设置作品为模板 */
export function createTemplate(params: object) {
  return axPost('/api/works/createTemplate', params)
}
/** 使用模板 */
export function useTemplate(params: object) {
  return axPost('/api/works/useTemplate', params)
}
/** 发布作品 */
export function publishWork(params: object) {
  return axPost('/api/works/publish', params)
}
