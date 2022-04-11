import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Avatar, Input, message, Pagination, Space, Table } from 'antd'
import { blue } from '../../../color'
import { apiUrl } from '../../../config'
import { subStringAvatar } from '../../Common/CellText'
import { TableSelectUserWrapper } from './SelectUserDepartmentBoxStyled'
import TableFooterWrapper from '../../TableFooterWrapper'

const { Search } = Input


const SelectUserDepartmentBox = props => {

  const { userStore, loadingAnimationStore, onSelectUser, rowSelection } = props
  const { userList, totalCount, pageIndex, pageSize } = userStore

  const tableColumn = useMemo(() => [
    {
      title: 'Thông tin',
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
      title: 'Tài khoản',
      render: record => record.userName,
    },
    {
      title: 'Email',
      render: record => record.email,
    },

  ], [userList])

  const handleChangePage = (page) => {
    userStore.setFilter('pageIndex', page - 1)
    loadingAnimationStore.setTableLoading(true)
    userStore.getUserList()
      .finally(() => loadingAnimationStore.setTableLoading(false))
  }

  const onSearchByName = value => {
    userStore.setFilter('pageIndex', 0)
    userStore.setFilter('userOrFullname', value && value.trim())
    loadingAnimationStore.setTableLoading(true)
    userStore.getUserList()
      .finally(() => {
        loadingAnimationStore.setTableLoading(false)
      })
  }

  useEffect(() => {
    return userStore.clearStore()
  }, [])

  useEffect(() => {
    userStore.setFilter('userOrFullname', null)
    userStore.setFilter('isEnabled', true);
    (async () => {
      loadingAnimationStore.setTableLoading(true)
      try {
        await userStore.getUserList()
      } catch (error) {
        console.log(error)
        message.error(error?.vi || 'Đã có lỗi xảy ra!')
      } finally {
        loadingAnimationStore.setTableLoading(false)
      }
    })()
    return () => userStore.clearStore()
  }, [])

  return (
    <TableSelectUserWrapper>
      <Space style={{ marginBottom: 16 }}>
        <span>Tìm kiếm người dùng: </span>
        <Search allowClear onSearch={onSearchByName} placeholder={'Tìm kiếm người dùng theo tên...'}
                style={{ minWidth: 400, marginLeft: 6 }} />
      </Space>
      <Table
        dataSource={userList}
        columns={tableColumn}
        rowKey={record => record.userName}
        pagination={false}
        loading={loadingAnimationStore.tableLoading}
        onRow={(record) => {
          return {
            onClick: () => onSelectUser(record),
          }
        }}
        rowSelection={{ ...rowSelection }}
      />
      <TableFooterWrapper>
        <Pagination
          current={pageIndex + 1}
          pageSize={pageSize}
          total={totalCount}
          hideOnSinglePage={true}
          onChange={handleChangePage}
        />
      </TableFooterWrapper>
    </TableSelectUserWrapper>
  )
}

SelectUserDepartmentBox.propTypes = {}

export default inject('userStore', 'loadingAnimationStore')(observer(SelectUserDepartmentBox))