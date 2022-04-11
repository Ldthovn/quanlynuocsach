import { observable, action, toJS } from 'mobx'
import { UserGroupRequest } from '../requests/UserGroupRequest'

class userGroupStore {
  @observable dataGroupStoreList = []
  @observable totalCountGroup = 0
  @observable pageGroupIndex = 0
  @observable pageGroupSize = 100
  @observable pageMemberByGroupIdIndex = 0
  @observable pageMemberByGroupIdSize = 100

  // Group đang được hiển thị trên UI
  @observable groupActive = undefined

  @action setGroupActive = (group) => {
    this.groupActive = group
  }

  @action getGroupList = () => {
    return new Promise((resolve, reject) => {
      UserGroupRequest.getGroupList(this.pageGroupIndex, this.pageGroupSize)
        .then(response => {
          const groupListCustom = response.data.data.map(group => {
            return {
              name_group: group.name,
              groupId: group.groupId,
              user_list: [],
            }
          })
          this.dataGroupStoreList = groupListCustom
          this.totalCountGroup = response.data.totalElements
          resolve(groupListCustom)
        })
        .catch(error => reject(error))
    })
  }

  // Lấy dữ liệu user_list của từng group và thay đổi dataGroupStoreList (thêm data user_list)
  @action getMemberListByIdGroup = (groupId) => {
    return new Promise((resolve, reject) => {
      UserGroupRequest.getMemberListByIdGroup(groupId, this.pageMemberByGroupIdIndex, this.pageMemberByGroupIdSize)
        .then(response => {
          const dataUserList = response.data.data.map(user => user.user)
          const groupSelected = this.dataGroupStoreList.find(group => group.groupId === groupId)
          const indexGroupSelected = this.dataGroupStoreList.findIndex(group => group.groupId === groupId)
          const newDataGroup = this.dataGroupStoreList
          newDataGroup.splice(indexGroupSelected, 1, { ...groupSelected, user_list: dataUserList })
          this.dataGroupStoreList = toJS(newDataGroup)
          resolve(response.data.data)
        })
        .catch(error => reject(error))

    })
  }

  @action createGroup = data => {
    return new Promise((resolve, reject) => {
      UserGroupRequest.createGroup(data)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
  @action updateGroup = (data, idGroup) => {
    return new Promise((resolve, reject) => {
      UserGroupRequest.updateGroup(data, idGroup)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  @action deleteGroup = idGroup => {
    return new Promise((resolve, reject) => {
      UserGroupRequest.deleteGroup(idGroup)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default new userGroupStore()

