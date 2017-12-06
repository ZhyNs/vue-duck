/**
 * api_login.js
 */
import * as API from './index'

export default {
  // 登录
  login: params => {
    return API.POST('api/v1/login', params)
  }
}