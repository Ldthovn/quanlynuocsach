import { action, autorun, observable } from 'mobx'
import moment from 'moment'
import { message } from 'antd'
import { AuthenticationRequest } from '../requests/AuthenticationRequest'

class AuthenticationStore {

  constructor() {
    autorun(() => {
      if (this.appToken) {
        const tokenData = JSON.parse(this.appToken)
        this.accessToken = tokenData.access_token
        const appTokenExpiration = tokenData.expires_in
        const refressToken = tokenData.refresh_token
        if (!moment().isBefore(moment().add(appTokenExpiration, 'seconds'))) {
          message.info('Phiên đăng nhập bị hết hạn')
          // Get new token
        }
      }
    })
  }

  @observable appToken = localStorage.getItem('jwt') || undefined
  @observable accessToken
  @observable currentUser = undefined

  @action userLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.userLogin(username, password)
        .then(response => {
          const tokenData = JSON.stringify(response.data)
          localStorage.setItem('jwt', tokenData)
          this.appToken = tokenData
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.getCurrentUser()
        .then(response => {
          this.currentUser = response.data
          return resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateCurrentUserInfo = (email, fullName) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.updateCurrentUserInfo(email, fullName)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
  @action updateCurrentUserPassword = (oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.updateCurrentUserPassword(oldPassword, newPassword)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
  @action userLogout = () => {
    this.appToken = undefined
    this.currentUser = undefined
    localStorage.clear()
    return Promise.resolve()
  }
  @action cancelRequest = () => {
    AuthenticationRequest.cancelRequest()
  }

}

export default new AuthenticationStore()
