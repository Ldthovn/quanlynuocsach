import axios from 'axios'
import { apiUrl } from '../config'
import authenticationStore from '../stores/authenticationStore'

export const UserGroupRequest = {
  getGroupList: (pageIndex, pageSize) =>
    axios({
      method: 'get',
      url: `${apiUrl}/api/v1/group`,
      headers: {
        'Authorization': `Bearer ${authenticationStore.accessToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        page: pageIndex,
        size: pageSize,
      },
    }),

  getMemberListByIdGroup: (groupId, pageIndex, pageSize) =>
    axios({
      method: 'get',
      url: `${apiUrl}/api/v1/group/${groupId}/member`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(authenticationStore.appToken).access_token}`,
        'Content-Type': 'application/json',
      },
      params: {
        page: pageIndex,
        size: pageSize,
      },
    }),

  createGroup: (data) =>
    axios({
      method: 'post',
      url: `${apiUrl}/api/v1/group`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(authenticationStore.appToken).access_token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }),

  updateGroup: (data, idGroup) =>
    axios({
      method: 'put',
      url: `${apiUrl}/api/v1/group/${idGroup}`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(authenticationStore.appToken).access_token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    }),

  deleteGroup: (idGroup) =>
    axios({
      method: 'delete',
      url: `${apiUrl}/api/v1/group/${idGroup}`,
      headers: {
        'Authorization': `Bearer ${JSON.parse(authenticationStore.appToken).access_token}`,
        'Content-Type': 'application/json',
      },
    }),
}