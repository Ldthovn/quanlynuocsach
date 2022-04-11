import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'
import utils from '../utils'

export const UserRequest = {
  getUserList: (pageSize, pageIndex, userOrFullname, isEnabled, asc) =>
    axios({
      method: 'get',
      url: `${apiUrl}/api/v1/users`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        page: pageIndex,
        size: pageSize,
        ...(!utils.isNullish(userOrFullname) && { userOrFullname: userOrFullname }),
        ...(!utils.isNullish(isEnabled) && { isEnabled: isEnabled }),
        ...(!utils.isNullish(asc) && { asc: asc }),
      },
    }),
  updateStatusUser: (userID) =>
    axios({
      method: 'patch',
      url: `${apiUrl}/api/v1/users/${userID}`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    }),
  deleteUser: (userID) =>
    axios({
      method: 'delete',
      url: `${apiUrl}/api/v1/users/${userID}`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    }),
  createUser: (data) =>
    axios({
      method: 'post',
      url: `${apiUrl}/api/v1/users`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }),
  getUser: (userID) =>
    axios({
      method: 'get',
      url: `${apiUrl}/api/v1/users/${userID}`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
    }),
  updateUser: (userID, userData) =>
    axios({
      method: 'put',
      url: `${apiUrl}/api/v1/users/${userID}`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      data: userData,
    }),
  updateUserPassword: (userID, passwordNew) =>
    axios({
      method: 'patch',
      url: `${apiUrl}/api/v1/users/${userID}/password`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      data: passwordNew,
    }),
}
