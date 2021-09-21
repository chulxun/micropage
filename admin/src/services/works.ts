import { request } from 'umi';

/** 作品列表 */
export async function worksList(params: API.PageParams, options?: API.Options) {
  return request<API.WorksList>('/admin/works/getWorksList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
