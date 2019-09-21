import request from '@/utils/wiki.request'

export function login(data) {
  return request({
    url: 'Api/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'Api/logout',
    method: 'get'
  })
}

export function apiGroup() {
  return request({
    url: 'Api/groupList',
    method: 'get'
  })
}

export function errorCode() {
  return request({
    url: 'Api/errorCode',
    method: 'get'
  })
}

export function detail(params) {
  return request({
    url: 'Api/detail',
    method: 'get',
    params
  })
}
