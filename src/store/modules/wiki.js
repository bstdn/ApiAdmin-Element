import { login, logout } from '@/api/wiki'
import { setToken, removeToken } from '@/utils/auth'

const state = {
}

const mutations = {
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        setToken(data.apiAuth)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
