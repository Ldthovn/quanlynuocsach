import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet/es/Helmet'
import PageHeading from '../../components/PageHeading'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import ContentBlockWrapper from '../../components/ContentBlockWrapper'
import AddUserGroupModal from './AddUserGroupModal'
import { inject, observer } from 'mobx-react'
import ListUserGroup from './ListUserGroup'

const UserGroupPage = props => {

  const { commonStore } = props
  const [isAddUserGroupModalVisible, setIsAddUserGroupModalVisible] = useState(false)

  const handleCloseUserGroupModal = () => {
    setIsAddUserGroupModalVisible(false)
  }

  const showAddUserGroupModal = () => {
    setIsAddUserGroupModalVisible(true)
  }

  useEffect(() => {
    commonStore.setPageName(['/household'])
  }, [])

  return (
    <>
      <Helmet><title>Danh sách hộ dân | Quản lý nước sạch</title></Helmet>
      <PageHeading title={'Danh sách hộ dân'}>
        <Button type={'primary'} onClick={showAddUserGroupModal}>
          <PlusCircleOutlined />
          Tạo nhóm người dùng mới
        </Button>
      </PageHeading>
      <ContentBlockWrapper>
        <ListUserGroup />
        <AddUserGroupModal
          isAddUserGroupModalVisible={isAddUserGroupModalVisible}
          handleCloseUserGroupModal={handleCloseUserGroupModal}
        />
      </ContentBlockWrapper>
    </>
  )
}

UserGroupPage.propTypes = {}

export default inject('commonStore')(observer(UserGroupPage))