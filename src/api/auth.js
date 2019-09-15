import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'Auth/index',
    method: 'get',
    params
  })
}

export function changeStatus(status, id) {
  return request({
    url: 'Auth/changeStatus',
    method: 'get',
    params: {
      status,
      id
    }
  })
}

export function add(data) {
  return request({
    url: 'Auth/add',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: 'Auth/edit',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'Auth/del',
    method: 'get',
    params: {
      id
    }
  })
}

export function delMember(params) {
  return request({
    url: 'Auth/delMember',
    method: 'get',
    params
  })
}

export function getGroups() {
  return request({
    url: 'Auth/getGroups',
    method: 'get'
  })
}

export function getRuleList(params) {
  return request({
    url: 'Auth/getRuleList',
    method: 'get',
    params
  })
}
