import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
import Wiki from '@/layout/wiki'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/wiki/login',
    component: () => import('@/views/wiki/login'),
    hidden: true
  },
  {
    path: '/wiki',
    component: Wiki,
    redirect: '/wiki/list',
    name: 'Wiki',
    meta: {
      title: 'wiki'
    },
    hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/wiki/list'),
        name: 'WikiList',
        meta: { title: 'wikiList' }
      },
      {
        path: 'error',
        component: () => import('@/views/wiki/error-code'),
        name: 'WikiError',
        meta: { title: 'wikiError' }
      },
      {
        path: 'calculation',
        component: () => import('@/views/wiki/calculation'),
        name: 'WikiCalculation',
        meta: { title: 'wikiCalculation' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/menu',
    name: 'System',
    meta: {
      title: 'system',
      icon: 'ios-build',
      roles: ['admin/Menu/index', 'admin/User/index', 'admin/Auth/index', 'admin/Log/index']
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/system/menu'),
        name: 'SystemMenu',
        meta: { title: 'systemMenu', icon: 'menu', roles: 'admin/Menu/index' }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user'),
        name: 'SystemUser',
        meta: { title: 'systemUser', icon: 'ios-people', roles: 'admin/User/index' }
      },
      {
        path: 'auth',
        component: () => import('@/views/system/auth'),
        name: 'SystemAuth',
        meta: { title: 'systemAuth', icon: 'lock', roles: 'admin/Auth/index' }
      },
      {
        path: 'log',
        component: () => import('@/views/system/log'),
        name: 'SystemLog',
        meta: { title: 'systemLog', icon: 'clipboard', roles: 'admin/Log/index' }
      }
    ]
  },
  {
    path: '/apps',
    component: Layout,
    redirect: '/app/appsGroup',
    name: 'App',
    meta: {
      title: 'app',
      icon: 'cloud',
      roles: ['admin/AppGroup/index', 'admin/App/index']
    },
    children: [
      {
        path: 'appsGroup',
        component: () => import('@/views/app/group'),
        name: 'AppGroup',
        meta: { title: 'appGroup', icon: 'ios-archive', roles: 'admin/AppGroup/index' }
      },
      {
        path: 'appsList',
        component: () => import('@/views/app/list'),
        name: 'AppList',
        meta: { title: 'appList', icon: 'md-list-box', roles: 'admin/App/index' }
      }
    ]
  },
  {
    path: '/interface',
    component: Layout,
    redirect: '/interface/interfaceGroup',
    name: 'Interface',
    meta: {
      title: 'interface',
      icon: 'ios-link',
      roles: ['admin/InterfaceGroup/index', 'admin/InterfaceList/index']
    },
    children: [
      {
        path: 'interfaceGroup',
        component: () => import('@/views/interface/group'),
        name: 'InterfaceGroup',
        meta: { title: 'interfaceGroup', icon: 'archive', roles: 'admin/InterfaceGroup/index' }
      },
      {
        path: 'interfaceList',
        component: () => import('@/views/interface/list'),
        name: 'InterfaceList',
        meta: { title: 'interfaceList', icon: 'infinite', roles: 'admin/InterfaceList/index' }
      },
      {
        path: 'request/:hash',
        component: () => import('@/views/interface/request'),
        name: 'InterfaceRequest',
        meta: { title: 'interfaceRequest', noCache: true, activeMenu: '/interface/interfaceList' },
        hidden: true
      },
      {
        path: 'response/:hash',
        component: () => import('@/views/interface/response'),
        name: 'InterfaceResponse',
        meta: { title: 'interfaceResponse', noCache: true, activeMenu: '/interface/interfaceList' },
        hidden: true
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', noCache: true },
        roles: ['admin/User/own']
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
