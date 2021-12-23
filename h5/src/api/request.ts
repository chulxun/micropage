
import axios from "axios";
import qs from "qs";
// import { store } from "@/store/index"
let config = {
  withCredentials: false
};
import { ElMessage } from 'element-plus'
// axios 配置
axios.defaults.timeout = 0; //无超时限制
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

// if (store.state.user.userInfo.token) {
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.user.userInfo.token;
// }

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error && error.response) {
      //401 跳转到登录页
      if (error.response.status == 401) {
        window.location.href = '/login';
        return;
      }
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        default:
      }
      throw new Error(error);
    }
    return Promise.reject(error);
  }
);
export async function axGet(url: string, data?: object, options?: object) {
  let paraObj = {
    params: data
  };
  paraObj = extend(paraObj, config);
  if (options && typeof options === "object") {
    paraObj = extend(paraObj, options);
  }
  return axios.get(url, paraObj).then(res => res.data);
}
export async function axPost(url: string, data?: object, options?: object, isJson?: boolean) {
  let paraObj = extend({}, config),
    params = qs.stringify(data);
  if (options && typeof options === "object") {
    paraObj = extend(paraObj, options);
  }
  if (isJson) {
    params = data;
  }
  return axios.post(url, params, paraObj).then(res => res.data);
}
export async function axPut(url: string, data: object, options: object) {
  let paraObj = extend({}, config),
    params = qs.stringify(data);
  if (options && typeof options === "object") {
    paraObj = extend(paraObj, options);
  }
  return axios.put(url, params, paraObj).then(res => res.data);
}
export async function axDelete(url: string, data: object, options: object) {
  let paraObj = {
    data: data
  };
  paraObj = extend(paraObj, config);
  if (options && typeof options === "object") {
    paraObj = extend(paraObj, options);
  }
  return axios.delete(url, paraObj).then(res => res.data);
}
//config追加配置
function extend(defaults: any, options: any) {
  let result = defaults || {};
  for (let prop in options) {
    if (!options.hasOwnProperty(prop)) break;
    if ("object" == typeof options[prop]) {
      result[prop] = extend(result[prop], options[prop]);
    } else {
      result[prop] = options[prop];
    }
  }
  return result;
}
