import request from '@/utils/request'

export function getHash() {
  return request({
    url: 'Index/getHash',
    method: 'get'
  })
}
