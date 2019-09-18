import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'AppGroup/index',
    method: 'get',
    params
  })
}

export function changeStatus(status, id) {
  return request({
    url: 'AppGroup/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export function add(data) {
  return request({
    url: 'AppGroup/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'AppGroup/edit',
    method: 'post',
    data
  })
}

export function del(hash) {
  return request({
    url: 'AppGroup/del',
    method: 'get',
    params: {
      hash
    }
  })
}
