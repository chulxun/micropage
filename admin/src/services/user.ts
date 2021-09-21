import { request } from 'umi';

/** 退出登录接口  */
export async function outLogin(options?: API.Options) {
  return request<Record<string, any>>('/admin/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 */
export async function login(body: API.LoginParams, options?: API.Options) {
  return request<API.LoginResult>('/admin/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestType: 'form',
    data: body,
    ...(options || {}),
  });
}
/** 用户列表 */
export async function user(params: API.PageParams, options?: API.Options) {
  return request<API.UserList>('/admin/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 注册接口 */
export async function register(body: API.RegisterParams, options?: API.Options) {
  return request<API.SubmitResult>('/admin/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestType: 'form',
    data: body,
    ...(options || {}),
  });
}
/** 修改密码 */
export async function changePwd(body: API.PwdParams, options?: API.Options) {
  return request<API.SubmitResult>('/admin/user/changePwd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestType: 'form',
    data: body,
    ...(options || {}),
  });
}
/** 注销用户 */
export async function writeOffUser(body: API.WhiteOffParams, options?: API.Options) {
  return request<API.SubmitResult>('/admin/user/writeOffUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestType: 'form',
    data: body,
    ...(options || {}),
  });
}
/** 恢复用户 */
export async function recoveryUser(body: API.WhiteOffParams, options?: API.Options) {
  return request<API.SubmitResult>('/admin/user/recoveryUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    requestType: 'form',
    data: body,
    ...(options || {}),
  });
}
