import request from '@/utils/request'
import Qs from 'qs'

export function fetchList(query) {
    return request({
        url: '/stat/union/serviceList',
        method: 'get',
        params: query,
        paramsSerializer: function(params) {
            return Qs.stringify(params, { arrayFormat: 'repeat' })
        }
    })
}

export function getBidDetail(query) {
  return request({
    url: '/stat/union/getBidDetail',
    method: 'get',
    params: query
  })
}


export function getBidItem(query) {
  return request({
    url: '/stat/union/getBidItem',
    method: 'get',
    params: query
  })
}


