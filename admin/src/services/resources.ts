import { request } from 'umi';

/** 资源列表 */
export async function getAllResources(params: API.Options, options?: API.Options) {
  return request<API.ResourcesResult>('/admin/resources/getList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 删除 */
export async function deleteResource(params: API.Options, options?: API.Options) {
  return request<API.SubmitResult>('/admin/resources/delete', {
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
export async function recoveryResource(params: API.Options, options?: API.Options) {
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