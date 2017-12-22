import axios from 'axios'
import store from './index'
import settings from '../conf/settings'

const base = settings.backend_api_base

const endpoints = {
  // 这里写你的api, 例:'dispatch调用的借口':'你的后台接口'
}

const request = (method, url, params) => {
  let config = {
    url: url,
    method: method
    // timeout: 5000 后期再加
  }

  if (process.env.NODE_ENV === 'production') {
    config.timeout = 5000
  }

  if (method === 'get') {
    config.params = params
  } else {
    config.data = params
  }

  const user = store.state.user
  if (store.getters.user_authorized) {
    config.headers = {'X-Authorization': 'Bearer ' + user.token.token}
  }

  return axios.request(config).then((response) => {
    return response.data
  }).catch((error) => {
    if (error.message.match('Network') || error.message.match('timeout')) {
      if (store.getters.app_initialized) {
        store.dispatch('toErrorPage', '/forbidding')
      } else {
        store.dispatch('error', {errmsg: '网络错误，稍后刷新重试!'})
      }

      return Promise.reject({error: '接口访问出错'})
    } else if (error.response.data) {
      if (error.response.data.code == 500) {
        store.dispatch('toErrorPage')
        return Promise.reject({error: '服务器出错!'})
      } else if (error.response.data.code == 400) {
        let length = error.response.data.errors.length || 0
        if (length > 0) {
          let msg = []
          error.response.data.errors.map(y => {
            msg.push(y.defaultMessage)
          })
          store.dispatch('error', {errmsg: msg.join('<br />')})
        }
        return Promise.reject({error: ''})
      }
      return error.response.data
    } else {
      return Promise.reject({error: '接口访问出错'})
    }
  })
}

class Api {
  constructor (base, endpoints) {
    this.base = base
    this.endpoints = endpoints
  }

  url (endpoint_name, ...args) {
    let endpoint = this.endpoints[endpoint_name]
    if (!endpoint) {
      throw Error('endpoint not foud!')
    }
    if (args.length > 0) {
      let i = 0
      let arg
      while ((arg = args.shift())) {
        i++
        endpoint = endpoint.replace('{' + i + '}', arg)
      }
    }
    return this.base + endpoint
  }

  get (url, params) {
    return request('get', url, params)
  }

  post (url, params) {
    return request('post', url, params)
  }

  patch (url, params) {
    return request('patch', url, params)
  }

  delete (url, params) {
    return request('delete', url, params)
  }

  put (url, params) {
    return request('put', url, params)
  }
}

export default new Api(base, endpoints)
