import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, Modal, message, Tag } from 'antd'
import { TitleModal, UserListSelected } from './AddUserGroupModalStyled'
import TableSelectUser from '../../../components/TableSelectUser'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

const AddUserGroupModal = props => {

  const { isAddUserGroupModalVisible, handleCloseUserGroupModal, userGroupStore, loadingAnimationStore } = props

  const [form] = Form.useForm()
  const [userGroupName, setUserGroupName] = useState('')
  const [userSelectedList, setUserSelectedList] = useState([])

  const rowSelection = {
    // click checkbox chọn hoặc bỏ chon user
    onSelect: (record) => {
      userSelectedList.map(user => user.userName).includes(record.userName) ?
        setUserSelectedList(userSelectedList.filter(user => user.userName !== record.userName)) :
        setUserSelectedList([...userSelectedList, {
          userName: record.userName,
          fullName: record.fullName,
        }])
    },
    selectedRowKeys: userSelectedList.map(user => user.userName),
  }

  // click row --> select user
  const onSelectUser = selectData => {
    userSelectedList.map(user => user.userName).includes(selectData.userName) ?
      setUserSelectedList(userSelectedList.filter(user => user.userName !== selectData.userName)) :
      setUserSelectedList([...userSelectedList, {
        userName: selectData.userName,
        fullName: selectData.fullName,
      }])
  }

  const onCancelModal = () => {
    handleCloseUserGroupModal()
    form.resetFields()
    setUserSelectedList([])
  }

  const handleAddUserGroup = async () => {
    if (!userGroupName.trim()) {
      return message.warning('Hãy đặt tên cho nhóm người dùng!')
    }
    if (!userSelectedList.length) {
      return message.warning('Bạn phải chọn ít nhất một người dùng!')
    }
    const valueSubmit = {
      name: userGroupName,
      members: userSelectedList.map(user => user.userName),
    }
    loadingAnimationStore.showSpinner(true)
    try {
      await userGroupStore.createGroup(valueSubmit)
      const responseGroupList = await userGroupStore.getGroupList()
      const responseMember = await userGroupStore.getMemberListByIdGroup(responseGroupList[0].groupId)
      userGroupStore.setGroupActive({
        ...responseGroupList[0],
        user_list: responseMember.map(user => user.user),
      })
      message.success('Tạo nhóm người dùng thành công!')
      onCancelModal()
      setUserGroupName('')
    } catch (err) {
      console.log(err)
      message.error('Đã có lỗi xảy ra!')
    } finally {
      loadingAnimationStore.showSpinner(false)
    }
  }

  // bỏ chọn người dùng khi click 'x' trong danh sách người dùng đã chọn
  const unselectUser = (username) => {
    setUserSelectedList(userSelectedList.filter(user => user.userName !== username))
  }

  return (
    <Modal
      title={
        <TitleModal>
          <div>Tạo nhóm người dùng mới</div>
          <div>
            <Button danger onClick={handleCloseUserGroupModal} style={{ marginRight: 10 }}>Hủy bỏ</Button>
            <Button
              type={'primary'}
              onClick={handleAddUserGroup}
            >Tạo mới</Button>
          </div>
        </TitleModal>
      }
      visible={isAddUserGroupModalVisible}
      onCancel={handleCloseUserGroupModal}
      footer={null}
      closable={false}
      width={1200}
    >
      <Form form={form}>
        <Form.Item label={'Tên nhóm người dùng:'} name={'name_group'}>
          <Input
            placeholder={'Nhập tên nhóm người dùng'}
            style={{ maxWidth: 400 }}
            onChange={e => setUserGroupName(e.target.value)}
          />
        </Form.Item>
      </Form>
      <UserListSelected>
        {
          userSelectedList.length !== 0 &&
          (
            <>
              <div className={'lable'}>Danh Sách người dùng đã được chọn:</div>
              {
                userSelectedList.map(user => (
                  <Tag color='#55ACEE' closable key={user.userName} onClose={() => unselectUser(user.userName)}>
                    {user.fullName}
                  </Tag>
                ))
              }
            </>
          )
        }
      </UserListSelected>
      <TableSelectUser onSelectUser={onSelectUser} rowSelection={rowSelection} />
    </Modal>
  )
}

AddUserGroupModal.propTypes = {}

export default inject('userGroupStore', 'loadingAnimationStore')(observer(AddUserGroupModal))