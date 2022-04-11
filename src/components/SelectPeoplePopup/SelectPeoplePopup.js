import React from 'react'
import PropTypes from 'prop-types'
import { ModalBody, ModalWrapper } from './SelectPeoplePopupStyled'
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd'
import { CloseOutlined, UnorderedListOutlined, WarningOutlined } from '@ant-design/icons'
import { blue, yellowPrimary } from '../../color'
import { inject, observer } from 'mobx-react'
import { EmptyText } from '../Common/CellText'
import { AvatarHasName } from '../Common/Avatar'
import SelectUserDepartmentBox from './SelectUserDepartmentBox'

const SelectPeoplePopup = props => {
  const {
    selectPeopleStore,
    isVisibleSelectPeoplePopup,
    handleCancelSelectUser,
    handleSubmitSelectUser,
  } = props
  const { selectPopupName, selectUserData } = selectPeopleStore

  const rowSelection = {
    // click checkbox chọn hoặc bỏ chon user
    onSelect: (record) => {
      selectUserData.map(user => user.id).includes(record.userName) ?
        selectPeopleStore.setSelectUserData(selectUserData.filter(user => user.id !== record.userName)) :
        selectPeopleStore.setSelectUserData([...selectUserData, {
          id: record.userName,
          name: record.fullName,
        }])
    },
    selectedRowKeys: selectUserData.map(user => user.id),
  }

  // click row --> select user
  const onSelectUser = selectData => {
    selectUserData.map(user => user.id).includes(selectData.userName) ?
      selectPeopleStore.setSelectUserData(selectUserData.filter(user => user.id !== selectData.userName)) :
      selectPeopleStore.setSelectUserData([...selectUserData, {
        id: selectData.userName,
        name: selectData.fullName,
      }])
  }

  // bỏ chọn người dùng khi click 'x' trong danh sách người dùng đã chọn
  const unselectUser = (id) => {
    selectPeopleStore.setSelectUserData(selectUserData.filter(user => user.id !== id))
  }

  return (
    <ModalWrapper
      maskClosable={false}
      okText={'Đồng ý'}
      cancelText={'Hủy bỏ'}
      width={1200}
      style={{ top: 20 }}
      title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{selectPopupName}</span>
        <Space>
          <Popconfirm placement='bottom' title={'Bạn có chắc chắn muốn xóa hết người được chọn không ?'}
                      onConfirm={handleCancelSelectUser}
                      okText='Đồng ý' cancelText='Không'>
            <Button danger icon={<WarningOutlined style={{ color: yellowPrimary }} />}>Hủy chọn</Button>
          </Popconfirm>
          <Button type={'primary'} onClick={handleSubmitSelectUser}>Đồng ý</Button>
          <Tooltip title={'Đóng'}>
            <CloseOutlined onClick={handleSubmitSelectUser} />
          </Tooltip>
        </Space>
      </div>}
      closable={false}
      forceRender={true}
      footer={null}
      visible={isVisibleSelectPeoplePopup}
    >
      <ModalBody>
        <div className={'list-box'}>
          <label style={{ width: 100, display: 'flex', fontWeight: 500, alignItems: 'center' }}>
            <UnorderedListOutlined style={{ marginRight: 4, color: blue }} />Danh sách:
          </label>
          {
            selectUserData.length > 0 ?
              selectUserData.map(user => {
                return <Tag
                  className={'tag-selected'}
                  color={'blue'}
                  key={user.id}
                  onClose={() => unselectUser(user.id)}
                  closable>
                  <AvatarHasName
                    imgId={user.image_id}
                    size={22}
                    name={user.name}
                  />
                </Tag>
              }) : <EmptyText><span style={{ lineHeight: '34px' }}>Chưa có người được chọn</span></EmptyText>
          }
        </div>
        <div className={'modal-body'}>
          <SelectUserDepartmentBox
            onSelectUser={onSelectUser}
            rowSelection={rowSelection}
          />
          <div />
        </div>
      </ModalBody>
    </ModalWrapper>
  )
}

SelectPeoplePopup.propTypes = {}

export default inject('selectPeopleStore')(observer(SelectPeoplePopup))