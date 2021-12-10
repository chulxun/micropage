import { request } from 'umi';

/** 作品列表 */
export async function getAllWorksList(params: API.Options, options?: API.Options) {
  return request<API.WorksResult>('/admin/works/getAllWorksList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 删除 */
export async function deleteWork(params: API.Options, options?: API.Options) {
  return request<API.SubmitResult>('/admin/works/deleteWork', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestType: 'form',
    data: params,
    ...(options || {}),
  });
}
/** 恢复 */
export async function recoveryWork(params: API.Options, options?: API.Options) {
  return request<API.SubmitResult>('/admin/works/recoveryWork', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestType: 'form',
    data: params,
    ...(options || {}),
  });
}