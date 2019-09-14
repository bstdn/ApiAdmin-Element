import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'Log/index',
    method: 'get',
    params
  })
}

export function del(id) {
  return request({
    url: 'Log/del',
    method: 'get',
    params: {
      id
    }
  })
}
