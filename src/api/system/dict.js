import request from '@/utils/request'

export function listDict(query) {
  return request({
    url: '/dicts',
    method: 'get',
    params: query
  })
}

export function createDict(data) {
  return request({
    url: '/dicts',
    method: 'post',
    data
  })
}

export function readDict(id) {
  return request({
    url: '/dicts/' + id,
    method: 'get'
  })
}

export function updateDict(data) {
  return request({
    url: '/dicts/' + data.id,
    method: 'put',
    data
  })
}

export function deleteDict(id) {
  return request({
    url: '/dicts/' + id,
    method: 'delete'
  })
}
export function listDictItem(dictId) {
  return request({
    url: '/dicts/' + dictId + '/items',
    method: 'get'
  })
}

export function listDictItemByName(dictName) {
  return request({
    url: '/dicts/items',
    method: 'get',
    params: {'dictName':dictName}
  })
}
export function listDictItemByCode(dictCode) {
  return request({
    url: '/dicts/items',
    method: 'get',
    params: {'dictCode':dictCode}
  })
}
export function createDictItem(data) {
  let dictId = data.dictId;
  return request({
    url: '/dicts/' + dictId + '/items',
    method: 'post',
    data
  })
}

export function updateDictItem(data) {
  let dictId = data.dictId;
  return request({
    url: '/dicts/' + dictId + '/items',
    method: 'put',
    data
  })
}

export function deleteDictItem(dictId, dictItemId) {
  return request({
    url: '/dicts/' + dictId + '/items/' + dictItemId,
    method: 'delete'
  })
}

export function listSimpleDictDatas() {
  return request({
    url: '/dicts/list-all-simple',
    method: 'get'
  })
}
