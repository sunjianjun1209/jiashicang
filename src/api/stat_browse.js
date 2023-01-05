import request from '@/utils/request'
import Qs from 'qs'

export function index(query) {
  return request({
    url: '/browseRecord/stat/index',
    method: 'get',
    params: query
  })
}

export function dayDetail(query) {
  return request({
    url: '/browseRecord/stat/dayDetail',
    method: 'get',
    params: query
  })
}
