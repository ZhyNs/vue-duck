/**
 * index.js
 */
import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080/duck/';
axios.defaults.timeout = 10000;

// POST传参序列化
axios.interceptors.request.use((config) => {
  if(config.method == 'post') {
    config.data = qs.stringify(config.data);
  }

  return config;
},(error) => {
  console.log('错误的传参');
  return Promise.reject(error);
});

// code状态码判断
// axios.interceptors.response.use((res) => {
//   if(res.data.code != '200') {
//     console.log(res.data.message);
//     return Promise.reject(res);
//   }

//   return res;
// },(error) => {
//   console.log('网络异常');
//   return Promise.reject(error);
// });

//通用方法
export const POST = (url, params) => {
  return axios.post(`${url}`, params).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${url}`, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${url}`, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${url}`, params).then(res => res.data)
}