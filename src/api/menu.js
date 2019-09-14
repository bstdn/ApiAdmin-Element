import request from '@/utils/request'

export function getList() {
  return request({
    url: 'Menu/index',
    method: 'get'
  })
}

export function changeStatus(status, id) {
  return request({
    url: 'Menu/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export function add(data) {
  return request({
    url: 'Menu/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'Menu/edit',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'Menu/del',
    method: 'get',
    params: {
      id
    }
  })
}
