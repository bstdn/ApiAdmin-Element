import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'Login/index',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'Login/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'Login/logout',
    method: 'get'
  })
}

export function getList(params) {
  return request({
    url: 'User/index',
    method: 'get',
    params
  })
}

export function changeStatus(status, id) {
  return request({
    url: 'User/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export function add(data) {
  return request({
    url: 'User/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'User/edit',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'User/del',
    method: 'get',
    params: {
      id
    }
  })
}
