import request from '@/utils/request'
import Qs from 'qs'

export function index() {
  return request({
    url: '/stat/order/index',
    method: 'get'
  })
}

export function dayDetail(query) {
  return request({
    url: '/stat/order/dayDetail',
    method: 'get',
    params: query
  })
}

export function monthDetail(query) {
  return request({
    url: '/stat/order/monthDetail',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

export function queryReduction(query) {
  return request({
    url: '/stat/order/reduction',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

export function handleDailyStat(query) {
  return request({
    url: '/stat/daily/list',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

export function handleExternalStat(query) {
  return request({
    url: '/stat/external_order/list',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  })
}

