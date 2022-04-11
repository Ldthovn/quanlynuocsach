import { action, observable } from 'mobx'
import { UserGroupRequest } from '../requests/UserGroupRequest'

class selectPeopleStore {

  @observable selectPopupName = 'Bảng chọn'
  @observable originGroupList = []
  @observable groupList = []

  @action getGroupList = () => {
    return new Promise((resolve, reject) => {
      UserGroupRequest.getGroupList(0, 1000, undefined)
        .then(response => {
          const groupListCustom = response.data.data.map(group => ({
            ...group,
            users: [],
          }))
          this.originGroupList = groupListCustom
          this.groupList = groupListCustom
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  @action setGroupList = (newList) => {
    this.groupList = newList
  }

  @action getMemberGroup = (id_group) => {
    return new Promise((resolve, reject) => {
        UserGroupRequest.getMemberListByIdGroup(id_group, 0, 100)
          .then(response => {
            const resultGroupList = this.originGroupList.map(group => group.groupId !== id_group ?
              group : {
                ...group,
                users: response.data.data,
              },
            )
            this.originGroupList = resultGroupList
            this.groupList = resultGroupList
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      },
    )
  }

  /** Select User */
  @observable selectUserData = []
  @action setSelectUserData = (payloadSelect) => {
    this.selectUserData = payloadSelect
  }

  @observable isVisibleSelectUserPopup = false
  @observable setIsVisibleSelectUserPopup = (bool) => {
    this.isVisibleSelectUserPopup = bool
  }

  @action handleOpenSelectUserPopup = () => {
    this.isVisibleSelectUserPopup = true
  }

  @action handleCancelSelectUser = () => {
    this.isVisibleSelectUserPopup = false
    this.selectUserData = []
  }

  @action clearSelectUserData = () => {
    this.selectUserData = []
  }

  /** Select Group */
  @observable selectGroupData = []
  @action setSelectGroupData = (payloadSelect) => {
    this.selectGroupData = payloadSelect
  }

  @observable isVisibleSelectGroupPopup = false
  @observable setIsVisibleSelectGroupPopup = (bool) => {
    this.isVisibleSelectGroupPopup = bool
  }

  @action clearSelectGroupData = () => {
    this.selectGroupData = []
  }

  @action handleOpenSelectGroupPopup = () => {
    this.isVisibleSelectGroupPopup = true
  }

  @action handleCancelSelectGroup = () => {
    this.isVisibleSelectGroupPopup = false
    this.selectGroupData = []
  }

  @action handleRemoveSelect = (item) => {
    this.selectUserData = [
      ...this.selectUserData.filter(el => el.id !== item.id),
    ]
    this.selectGroupData = [
      ...this.selectGroupData.filter(el => el.id !== item.id),
    ]
  }

  @action clearSelectPeopleStore = () => {
    this.clearSelectUserData()
    this.clearSelectGroupData()
  }

}

export default new selectPeopleStore()