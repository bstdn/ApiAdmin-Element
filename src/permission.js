import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/wiki/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if (getToken()) {
    if (to.path.indexOf('/wiki') === -1) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        if (store.getters.roles && store.getters.roles.length > 0) {
          if (hasPermission(store.getters.roles, to.meta.roles)) {
            next()
          } else {
            next({ path: '/401', replace: true, query: { noGoBack: true }})
          }
        } else {
          try {
            const { access } = await store.dispatch('user/getInfo')
            const accessRoutes = await store.dispatch('permission/generateRoutes', access)
            router.addRoutes(accessRoutes)
            next({ ...to, replace: true })
          } catch (err) {
            await store.dispatch('user/resetToken')
            Message.error(err || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      if (to.path === '/wiki/login') {
        next({ path: '/wiki/list' })
        NProgress.done()
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (to.path.indexOf('/wiki') === -1) {
        next(`/login?redirect=${to.path}`)
      } else {
        next(`/wiki/login?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
