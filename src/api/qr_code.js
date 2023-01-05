import request from '@/utils/request'

export function getQrcode(query) {
  return request({
    url: '/wx/member/qrcode',
    method: 'get',
    params: query
  })
}

export function getQrConnect(params) {
  return request({
    url: '/wx/member/qrconnect',
    method: 'get',
    timeout: 12000,
    params
  })
}
