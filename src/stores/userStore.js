import { observable, action, toJS } from 'mobx'
import { UserRequest } from '../requests/UserRequest'

class UserStore {
  @observable userList = []
  @observable userDetail = {}
  @observable totalCount = 0
  @observable pageIndex = 0
  @observable pageSize = 10000
  @observable userOrFullname = null
  @observable isEnabled = null
  @observable isAsc = null

  @action setFilter = (filterName, filterValue) => {
    if (typeof filterName !== 'string') return
    this[filterName] = filterValue
  }
  @action getUserList = () => {
    return new Promise((resolve, reject) => {
      UserRequest.getUserList(this.pageSize, this.pageIndex, this.userOrFullname, this.isEnabled, this.isAsc)
        .then(response => {
          const data = response.data.data
          const totalCount = response.data.totalElements - 1
          /** Trừ đi username là admin */
          this.userList = data.filter(el => el.userName !== 'admin')
          this.totalCount = totalCount
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }
  @action updateStatusUser = (userID) => {
    return new Promise((resolve, reject) => {
      UserRequest.updateStatusUser(userID)
        .then(response => {
          resolve(response)
        })
        .catch(error => reject(error))
    })
  }
  @action deleteUser = (userID) => {
    return new Promise((resolve, reject) => {
      UserRequest.deleteUser(userID)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
  @action createUser = (data) => {
    return new Promise((resolve, reject) => {
      UserRequest.createUser(data)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }
  @action getUser = (userID) => {
    return new Promise((resolve, reject) => {
      UserRequest.getUser(userID)
        .then(response => {
          this.userDetail = response.data
          resolve(response.data)
        })
        .catch(error => reject(error))
    })
  }
  @action updateUser = (userID, userData) => {
    return new Promise((resolve, reject) => {
      UserRequest.updateUser(userID, userData)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
    })
  }
  @action updateUserPassword = (userID, passwordNew) => {
    return new Promise((resolve, reject) => {
      UserRequest.updateUserPassword(userID, passwordNew)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }

  @action clearStore = () => {
    this.userList = []
    this.userDetail = {}
    this.totalCount = 0
    this.pageIndex = 0
    this.pageSize = 10000
    this.userOrFullname = null
    this.isEnabled = null
    this.isAsc = null
  }

}

export default new UserStore()
