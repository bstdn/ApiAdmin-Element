import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

export const baseUrl = process.env.VUE_APP_BASE_API + '/wiki'

const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const apiAuth = getToken()
    if (apiAuth !== false) {
      config.headers['apiAuth'] = apiAuth
    }
    return config
  }, error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === -14) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err', error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
