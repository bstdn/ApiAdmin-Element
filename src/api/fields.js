import request from '@/utils/request'

export function getRequest(params) {
  return request({
    url: 'Fields/request',
    method: 'get',
    params
  })
}

export function getResponse(params) {
  return request({
    url: 'Fields/response',
    method: 'get',
    params
  })
}

export function upJson(data) {
  return request({
    url: 'Fields/upload',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'Fields/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'Fields/edit',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'Fields/del',
    method: 'get',
    params: {
      id
    }
  })
}
