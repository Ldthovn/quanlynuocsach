import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Modal, Tag } from 'antd'
import TableSelectUser from '../../../../components/TableSelectUser/TableSelectUser'
import { TitleModal, UserListSelected } from './EditUserGroupModalStyled'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import loadingAnimationStore from '../../../../stores/loadingAnimationStore'

const EditUserGroupModal = props => {
  const { isEditUserGroupModalVisible, userGroupStore, handleCloseEditUserGroupModal } = props
  const [form] = Form.useForm()

  const { groupActive } = userGroupStore

  const [userGroupName, setUserGroupName] = useState('')
  const [userSelectedList, setUserSelectedList] = useState([])

  useEffect(() => {
    if (!groupActive || isEditUserGroupModalVisible) return
    setUserGroupName(groupActive.name_group)
    setUserSelectedList(groupActive.user_list.map(user => ({
      userName: user.userName,
      fullName: user.fullName,
    })))
  }, [groupActive, isEditUserGroupModalVisible])

  const rowSelection = {
    // click checkbox chọn hoặc bỏ chọn người dùng
    onSelect: (record) => {
      userSelectedList.map(user => user.userName).includes(record.userName) ?
        setUserSelectedList(userSelectedList.filter(user => user.userName !== record.userName))
        :
        setUserSelectedList([...userSelectedList, {
          userName: record.userName,
          fullName: record.userName,
        }])
    },
    selectedRowKeys: userSelectedList.map(user => user.userName),
  }

  // click row --> select user
  const onSelectUser = (selectData) => {
    userSelectedList.map(user => user.userName).includes(selectData.userName) ?
      setUserSelectedList(userSelectedList.filter(user => user.userName !== selectData.userName))
      :
      setUserSelectedList([...userSelectedList, {
        userName: selectData.userName,
        fullName: selectData.fullName,
      }])
  }

  const unselectUser = (username) => {
    setUserSelectedList(userSelectedList.filter(user => user.userName !== username))
  }

  const handleUpdateGroup = async () => {
    if (!userGroupName.trim()) {
      return message.warning('Hãy đặt tên cho nhóm người dùng!')
    }
    if (userSelectedList.length === 0) {
      return message.warning('Bạn phải chọn ít nhất một người dùng!')
    }
    const valueSubmit = {
      name: userGroupName,
      members: userSelectedList.map(user => user.userName),
    }
    loadingAnimationStore.showSpinner(true)
    try {
      await userGroupStore.updateGroup(valueSubmit, groupActive.groupId)
      const responseGroupList = await userGroupStore.getGroupList()
      const response = await userGroupStore.getMemberListByIdGroup(groupActive.groupId)
      userGroupStore.setGroupActive({
        ...responseGroupList.find(group => group.groupId === groupActive.groupId),
        user_list: response.map(user => user.user),
      })
      handleCloseEditUserGroupModal()
      message.success('Cập nhật nhóm người dùng thành công!')
    } catch (error) {
      console.log(error)
      message.error(error?.vi || 'Đã có lỗi xảy ra!')
    } finally {
      loadingAnimationStore.showSpinner(false)
    }
  }

  return (
    <Modal
      title={
        <TitleModal>
          <div>Cập nhật nhóm người dùng</div>
          <div>
            <Button danger onClick={handleCloseEditUserGroupModal} style={{ marginRight: 10 }}>Hủy bỏ</Button>
            <Button
              type={'primary'}
              onClick={handleUpdateGroup}
            >Cập nhật</Button>
          </div>
        </TitleModal>
      }
      visible={isEditUserGroupModalVisible}
      onCancel={isEditUserGroupModalVisible}
      footer={null}
      closable={false}
      width={1200}>
      <Form
        form={form}
        fields={[{
          'name': ['name_group'],
          'value': userGroupName,
        }]}
      >
        <Form.Item
          style={{ marginBottom: 12 }}
          label={'Tên nhóm người dùng:'}
          name={'name_group'}
        >
          <Input
            onChange={(e) => setUserGroupName(e.target.value)}
            style={{ maxWidth: 400 }} />
        </Form.Item>
        <UserListSelected>
          {
            userSelectedList.length !== 0 ?
              (
                <>
                  <div className={'lable'}>Danh Sách người dùng đã được chọn:</div>
                  {
                    userSelectedList.map(user => {
                        return <Tag color='#55ACEE' closable key={user.userName}
                                    onClose={() => unselectUser(user.userName)}>
                          {user.fullName}
                        </Tag>
                      },
                    )
                  }
                </>) : null
          }
        </UserListSelected>
      </Form>
      <TableSelectUser
        onSelectUser={onSelectUser}
        rowSelection={rowSelection}
      />
    </Modal>
  )
}

EditUserGroupModal.propTypes = {}

export default inject('userGroupStore')(observer(EditUserGroupModal))