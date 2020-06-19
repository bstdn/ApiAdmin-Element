import request from '@/utils/request'

export function getHash() {
  return request({
    url: 'InterfaceList/getHash',
    method: 'get'
  })
}
