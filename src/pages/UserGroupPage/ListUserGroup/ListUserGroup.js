import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Avatar, message, Popconfirm, Tabs } from 'antd'
import { subStringAvatar, TextWrap, trimOverlengthString } from '../../../components/Common/CellText'
import TableComponent from '../../../components/Common/TableComponent'
import { blue } from '../../../color'
import { apiUrl } from '../../../config'
import { ButtonItem, ButtonItemWrapper, ListUserGroupWrapper, TabUserGroupWrapper } from './ListUserGroupStyled'
import { DeleteTwoTone, QuestionCircleOutlined, SettingOutlined, UserDeleteOutlined } from '@ant-design/icons'
import EmptyContent from '../../../components/EmptyContent'
import EditUserGroupModal from './EditUserGroupModal'
import loadingAnimationStore from '../../../stores/loadingAnimationStore'

const { TabPane } = Tabs

const ListUserGroup = props => {

  const { userGroupStore, loadingAnimationStore } = props
  const { dataGroupStoreList, groupActive } = userGroupStore

  const [isEditUserGroupModalVisible, setIsEditUserGroupModalVisible] = useState(false)
  const [userGroupName, setUserGroupName] = useState('')
  const [userSelectedList, setUserSelectedList] = useState([])

  const tableColumn = useMemo(() => [
    {
      title: 'Thông tin',
      width: 250,
      render: record => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar style={{ backgroundColor: blue }}
                  src={record.imgId && `${apiUrl}/api/v1/images/${record.imgId}`}>
            {subStringAvatar(record.fullName)}
          </Avatar>
          <div style={{ marginLeft: 10 }}>{record.fullName}</div>
        </div>
      ),
    },
    {
      title: 'Email',
      render: record => record.email,
    },
    {
      title: (
        <ButtonItemWrapper>
          <ButtonItem title={'Chỉnh sửa người nhóm người dùng'}>
            <SettingOutlined style={{ color: '#40A9FF' }}
                             onClick={() => setIsEditUserGroupModalVisible(true)} />
          </ButtonItem>
          <Popconfirm
            onConfirm={() => handleDeleteGroup()}
            okText={'Đồng ý'} cancelText={'Không'} okType={'danger'}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            title={'Bạn có muốn xóa nhóm người dùng này?'}>
            <ButtonItem title={'Xóa nhóm'}>
              <DeleteTwoTone twoToneColor={'#e74c3c'} onClick={(event => event.stopPropagation())} />
            </ButtonItem>
          </Popconfirm>
        </ButtonItemWrapper>
      ),
      fixed: 'right',
      align: 'center',
      width: 90,
      render: record => (
        <ButtonItemWrapper>
          {
            groupActive && groupActive.user_list.length > 0 &&
            <Popconfirm
              onConfirm={() => handleDeleteMemberGroup(record.groupId, record.userName)}
              okText={'Đồng ý'} cancelText={'Không'} okType={'danger'}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              title={'Bạn có muốn xóa người dùng này khỏi nhóm?'}>
              <ButtonItem title={'Xóa người dùng khỏi nhóm'} placement='left'>
                <UserDeleteOutlined style={{ color: 'red' }} />
              </ButtonItem>
            </Popconfirm>
          }
        </ButtonItemWrapper>
      ),
    },
  ], [dataGroupStoreList, groupActive])

  const handleDeleteMemberGroup = async (groupId, userName) => {
    const valueSubmit = {
      name: groupActive.name_group,
      members: groupActive.user_list.filter(user => user.userName !== userName).map(user => user.userName),
    }
    loadingAnimationStore.setTableLoading(true)
    try {
      await userGroupStore.updateGroup(valueSubmit, groupId)
      await userGroupStore.getMemberListByIdGroup(groupId)
      userGroupStore.setGroupActive({
        ...groupActive,
        user_list: groupActive.user_list.filter(user => user.userName !== userName),
      })
      message.success('Xóa người dùng thành công!')
    } catch (error) {
      console.log(error)
      message.error(error?.vi || 'Đã có lỗi xảy ra!')
    } finally {
      loadingAnimationStore.setTableLoading(false)
    }
  }

  const onChangeTabUserGroup = async (key) => {
    const groupTarget = dataGroupStoreList.find(group => group.groupId === parseInt(key))
    if (groupTarget?.user_list.length > 0) {
      return userGroupStore.setGroupActive(groupTarget)
    }
    try {
      loadingAnimationStore.setTableLoading(true)
      const response = await userGroupStore.getMemberListByIdGroup(parseInt(key))
      if (response.length === 0) {
        const groupActive = dataGroupStoreList.find(group => group?.groupId === parseInt(key))
        userGroupStore.setGroupActive(groupActive)
      } else {
        const groupActive = dataGroupStoreList.find(group => group?.groupId === response[0]?.groupId)
        userGroupStore.setGroupActive(groupActive)
      }
    } catch (err) {
      console.log(err)
      message.error('Lấy thông tin người dùng trong nhóm thất bại!')
    } finally {
      loadingAnimationStore.setTableLoading(false)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        loadingAnimationStore.setTableLoading(true)
        const responseGroupList = await userGroupStore.getGroupList()
        if (responseGroupList.length > 0) {
          const responseMemberGroup = await userGroupStore.getMemberListByIdGroup(responseGroupList[0].groupId)
          userGroupStore.setGroupActive({
            ...responseGroupList[0],
            user_list: responseMemberGroup.map(user => user.user),
          })
        }
      } catch (error) {
        console.log(error)
        message.error(error?.vi || 'Đã có lỗi xảy ra!')
      } finally {
        loadingAnimationStore.setTableLoading(false)
      }
    })()
  }, [])

  const handleDeleteGroup = async () => {
    try {
      loadingAnimationStore.setTableLoading(true)
      await userGroupStore.deleteGroup(groupActive.groupId)
      const responseGroupList = await userGroupStore.getGroupList()
      if (responseGroupList.length === 0) {
        return message.success(<span>Xóa nhóm <b>{groupActive.name_group}</b> thành công!</span>)
      }
      const responseMemberGroup = await userGroupStore.getMemberListByIdGroup(responseGroupList[0].groupId)
      userGroupStore.setGroupActive({
        ...responseGroupList[0],
        user_list: responseMemberGroup.map(user => user.user),
      })
      message.success(<span>Xóa nhóm <b>{groupActive.name_group}</b> thành công!</span>)
    } catch (error) {
      console.log(error)
      message.error(error?.vi || 'Đã có lỗi xảy ra!')
    } finally {
      loadingAnimationStore.setTableLoading(false)
    }
  }

  return (
    <ListUserGroupWrapper>
      <TabUserGroupWrapper
        tabPosition={'left'}
        onChange={onChangeTabUserGroup}
        activeKey={groupActive?.groupId && groupActive?.groupId + ''}
      >
        {
          dataGroupStoreList.map(group => {
            const userListHasIdGroup = group.user_list.map(user => {
              return {
                ...user,
                groupId: group.groupId,
              }
            })
            return (
              <TabPane
                tab={
                  <>
                    <TextWrap>
                      {trimOverlengthString(group.name_group, 200)}
                    </TextWrap>
                  </>
                }
                key={group.groupId}
              >
                <TableComponent
                  rowKey={(record) => {
                    return record.userName + group.groupId
                  }}
                  columns={tableColumn}
                  dataSource={userListHasIdGroup}
                  pagination={userListHasIdGroup.length > 10}
                  scroll={{ x: 650 }}
                  loading={loadingAnimationStore.tableLoading}
                />
              </TabPane>
            )
          })
        }
      </TabUserGroupWrapper>
      {
        !dataGroupStoreList.length && <EmptyContent description={'Không có nhóm người dùng!'} />
      }
      <EditUserGroupModal
        isEditUserGroupModalVisible={isEditUserGroupModalVisible}
        handleCloseEditUserGroupModal={() => {
          setIsEditUserGroupModalVisible(false)
        }}
      />
    </ListUserGroupWrapper>
  )
}

ListUserGroup.propTypes = {}

export default inject('userGroupStore', 'loadingAnimationStore')(observer(ListUserGroup))