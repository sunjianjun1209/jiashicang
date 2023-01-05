import request from '@/utils/request'
import Qs from 'qs'

export function index() {
  return request({
    url: '/stat/enterprise/index',
    method: 'get'
  })
}

export function dayDetail(query) {
  return request({
    url: '/stat/enterprise/dayDetail',
    method: 'get',
    params: query
  })
}

export function monthDetail(query) {
  return request({
    url: '/stat/enterprise/monthDetail',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}



