import axios from 'axios'
import { apiUrl, oauth } from '../config'
import qs from 'querystring'
import authenticationStore from '../stores/authenticationStore'

const source = axios.CancelToken.source()

export const AuthenticationRequest = {
  cancelRequest: () => {
    source.cancel()
  },
  userLogin: (username, password) =>
    axios({
      method: 'post',
      url: `${apiUrl}/api/oauth/token`,
      headers: {
        'Authorization': `Basic ${Buffer.from(`${oauth.clientId}:${oauth.clientSecret}`, 'utf8').toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        username: username,
        password: password,
        grant_type: 'password',
      }),
      cancelToken: source.token,
    }),
  getCurrentUser: () =>
    axios({
      method: 'get',
      url: `${apiUrl}/api/v1/users/current`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      cancelToken: source.token,
    }),
  updateCurrentUserInfo: (email, fullName) =>
    axios({
      method: 'put',
      url: `${apiUrl}/api/v1/users/current`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
        fullName: fullName,
      },
      cancelToken: source.token,
    }),
  updateCurrentUserPassword: (oldPassword, newPassword) =>
    axios({
      method: 'patch',
      url: `${apiUrl}/api/v1/users/current/password`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      data: {
        passwordNew: newPassword,
        passwordOld: oldPassword,
      },
      cancelToken: source.token,
    }),
}
