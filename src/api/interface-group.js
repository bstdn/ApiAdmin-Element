import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'InterfaceGroup/index',
    method: 'get',
    params
  })
}

export function changeStatus(status, id) {
  return request({
    url: 'InterfaceGroup/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export function add(data) {
  return request({
    url: 'InterfaceGroup/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'InterfaceGroup/edit',
    method: 'post',
    data
  })
}

export function del(hash) {
  return request({
    url: 'InterfaceGroup/del',
    method: 'get',
    params: {
      hash
    }
  })
}
