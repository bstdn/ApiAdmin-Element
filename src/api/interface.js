import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'InterfaceList/index',
    method: 'get',
    params
  })
}

export function changeStatus(status, hash) {
  return request({
    url: 'InterfaceList/changeStatus',
    method: 'get',
    params: {
      status,
      hash
    }
  })
}

export function add(data) {
  return request({
    url: 'InterfaceList/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'InterfaceList/edit',
    method: 'post',
    data
  })
}

export function del(hash) {
  return request({
    url: 'InterfaceList/del',
    method: 'get',
    params: {
      hash
    }
  })
}

export function refresh() {
  return request({
    url: 'InterfaceList/refresh',
    method: 'get'
  })
}
