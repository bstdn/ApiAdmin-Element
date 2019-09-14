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
