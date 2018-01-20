/**
 * api_blog.js
 */
import * as API from './index'

export default {
  queryList: params => {
    return API.POST('api/v1/back/blog/batch', params)
  },
  publish: params => {
    return API.POST('api/v1/back/blog/publish', params)
  },
  topublish: params => {
    return API.POST('api/v1/back/blog/topublish', params)
  },
  delete: params => {
    return API.POST('api/v1/back/blog/delete', params)
  },
  get: (params) => {
    return API.POST('api/v1/back/blog/get', params)
  }
}