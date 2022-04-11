import React, { useEffect, useMemo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet/es/Helmet'
import PageHeading from '../../components/PageHeading'
import { Button, Divider, message, Pagination, Popconfirm, Switch, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import TableFooterWrapper from '../../components/TableFooterWrapper'
import CreateEditUserForm from '../../components/CreateEditUserForm'
import ContentBlockWrapper from '../../components/ContentBlockWrapper'
import TableComponent from '../../components/Common/TableComponent'

const ConnectedDocumentManagePage = props => {

  const { commonStore, userStore, loadingAnimationStore } = props
  const { userList, totalCount, pageIndex, pageSize } = userStore

  const [showModalUser, setShowModalUser] = useState(false)

  const tableColumns = useMemo(() => [
    {
      title: 'Họ tên',
      render: record => record.fullName,
    },
    {
      title: 'Tên tài khoản',
      render: record => record.userName,
    },
    {
      title: 'Email',
      render: record => record.email,
    },
    {
      title: 'Trạng thái',
      render: record =>
        <Switch
          checked={record?.isEnabled}
          onChange={status => handleUpdateUserStatus(record.id, status)}
        />,
    },
    {
      title: 'Tác vụ',
      render: record =>
        <>
          <Tooltip title={'Sửa thông tin tài khoản'}>
            <EditOutlined onClick={() => handleEditModal(record.id)} />
          </Tooltip>
          <Divider type={'vertical'} />
          <Tooltip title={'Xóa'}>
            <Popconfirm
              onConfirm={() => handleDeleteUser(record.id)}
              okText={'Đồng ý'} cancelText={'Không'} okType={'danger'}
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              title={'Bạn có muốn xoá tài khoản này?'}>
              <DeleteOutlined style={{ color: '#fc0000' }} />
            </Popconfirm>
          </Tooltip>
        </>,
    },
  ], [userList, pageIndex])

  const handleDeleteUser = useCallback(async userID => {
    try {
      loadingAnimationStore.showSpinner(true)
      await userStore.deleteUser(userID)
      if (userList.length === 1 && pageIndex !== 0) {
        userStore.setFilter('pageIndex', pageIndex - 1)
      }
      await userStore.getUserList()
      message.success('Đã xóa!')
    } catch (error) {
      console.log(error)
      message.error(error?.vi || 'Đã có lỗi xảy ra!')
    } finally {
      loadingAnimationStore.showSpinner(false)
    }
  }, [userList, pageIndex])
  const handleUpdateUserStatus = useCallback((userID, status) => {
    userStore.updateStatusUser(userID)
      .then(() => {
        userStore.getUserList()
        message.success(`Đã ${status ? 'kích hoạt' : 'tạm dừng'} người dùng`)
      })
      .catch(error => console.log(error))
  }, [userStore, userList])
  const handleChangePage = useCallback(page => {
    const pageIndex = page - 1
    userStore.setFilter('pageIndex', pageIndex)
  }, [])
  const handleCreateModal = useCallback(() => {
    setShowModalUser(true)
    commonStore.setIsEditMode(false)
  }, [])
  const handleEditModal = useCallback(userID => {
    setShowModalUser(true)
    commonStore.setIsEditMode(true)
    userStore.getUser(userID)
  }, [])

  useEffect(() => {
    commonStore.setPageName(['/connected-document/manage/account'])
    userStore.clearStore()
  }, [])
  useEffect(() => {
    userStore.setFilter('pageSize', 10)
    userStore.setFilter('isAsc', 'DESC');
    (async () => {
      try {
        loadingAnimationStore.setTableLoading(true)
        await userStore.getUserList()
      } catch (error) {
        console.log(error)
        message.error(error?.vi || 'Đã có lỗi xảy ra!')
      } finally {
        loadingAnimationStore.setTableLoading(false)
      }
    })()
      .catch(error => console.log(error))
  }, [pageIndex])

  return (
    <>
      <Helmet>
        <title>{'Tài khoản công nhân | Quản lý nước sạch'}</title>
      </Helmet>
      <PageHeading title={'Tài khoản công nhân'}>
        <Button type={'primary'} onClick={handleCreateModal}>
          <PlusCircleOutlined />
          Thêm mới tài khoản
        </Button>
      </PageHeading>
      <ContentBlockWrapper>
        <TableComponent
          rowKey={record => record.id}
          dataSource={userList}
          columns={tableColumns}
          pagination={false}
          loading={{
            tip: 'Đang tải tài khoản...',
            spinning: loadingAnimationStore.tableLoading,
          }}
        />
        <TableFooterWrapper>
          <Pagination
            current={pageIndex + 1}
            pageSize={pageSize}
            total={totalCount}
            onChange={handleChangePage}
            hideOnSinglePage={true}
          />
        </TableFooterWrapper>
        <CreateEditUserForm
          modalVisibleProps={showModalUser}
          modalCancelProps={() => setShowModalUser(false)}
        />
      </ContentBlockWrapper>
    </>
  )
}

ConnectedDocumentManagePage.propTypes = {
  commonStore: PropTypes.object,
}

export default inject(
  'commonStore',
  'userStore',
  'loadingAnimationStore',
)(observer(ConnectedDocumentManagePage))
