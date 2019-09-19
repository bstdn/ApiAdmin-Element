import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'App/index',
    method: 'get',
    params
  })
}

export function changeStatus(status, id) {
  return request({
    url: 'App/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export function add(data) {
  return request({
    url: 'App/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'App/edit',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'App/del',
    method: 'get',
    params: {
      id
    }
  })
}

export function getAppInfo(id) {
  return request({
    url: 'App/getAppInfo',
    method: 'get',
    params: {
      id
    }
  })
}

export function refreshAppSecretApi() {
  return request({
    url: 'App/refreshAppSecret',
    method: 'get'
  })
}
