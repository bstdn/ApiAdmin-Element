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
