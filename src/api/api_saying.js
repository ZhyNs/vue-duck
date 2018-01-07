/**
 * api_saying.js
 */
import * as API from './index'

export default {
  // 查询列表
  queryList: params => {
    return API.POST('api/v1/back/saying/batch', params)
  },
  create: params => {
    return API.POST('api/v1/back/saying/create', params)
  },
  edit: params => {
    return API.POST('api/v1/back/saying/edit', params)
  },
  delete: params => {
    return API.POST('api/v1/back/saying/delete', params)
  }
}