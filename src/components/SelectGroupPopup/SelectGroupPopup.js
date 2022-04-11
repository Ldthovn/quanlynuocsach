import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { ModalWrapper } from './SelectGroupPopupStyled'
import { Popconfirm, Space, Button, Tooltip, Tag } from 'antd'
import { CloseOutlined, TeamOutlined, UnorderedListOutlined, WarningOutlined } from '@ant-design/icons'
import { blue, yellowPrimary } from '../../color'
import { AvatarHasName } from '../Common/Avatar'
import { ModalBody } from '../SelectPeoplePopup/SelectPeoplePopupStyled'
import { EmptyText } from '../Common/CellText'
import SelectGroupBox from './SelectGroupBox'

const SelectGroupPopup = props => {

  const {
    isVisibleSelectGroupPopup, handleSubmitSelectGroup,
    handleCancelSelectGroup, selectPeopleStore,
  } = props

  const { selectGroupData } = selectPeopleStore

  const onCancelSelectGroup = () => {
    handleCancelSelectGroup()
  }

  const handleRemoveSelect = useCallback((group) => {
    selectPeopleStore.setSelectGroupData(selectGroupData.filter(el => el.id !== group.id))
  }, [selectGroupData])

  return (
    <ModalWrapper
      maskClosable={false}
      okText={'Đồng ý'}
      cancelText={'Hủy bỏ'}
      width={1200}
      footer={null}
      style={{ top: 20 }}
      title={<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Bảng chọn nhóm</span>
        <Space>
          <Popconfirm placement='bottom' title={'Bạn có chắc chắn muốn xóa hết người được chọn không ?'}
                      onConfirm={onCancelSelectGroup}
                      okText='Đồng ý' cancelText='Không'>
            <Button danger icon={<WarningOutlined style={{ color: yellowPrimary }} />}>Hủy chọn</Button>
          </Popconfirm>
          <Button type={'primary'} onClick={handleSubmitSelectGroup}>Đồng ý</Button>
          <Tooltip title={'Đóng'}>
            <CloseOutlined onClick={handleSubmitSelectGroup} />
          </Tooltip>
        </Space>
      </div>}
      closable={false}
      forceRender={true}
      visible={isVisibleSelectGroupPopup}>
      <ModalBody>
        <div className={'list-box'}>
          <label style={{ width: 100, display: 'flex', alignItems: 'center', fontWeight: 500 }}>
            <UnorderedListOutlined style={{ marginRight: 4, color: blue }} />Danh sách:
          </label>
          {
            selectGroupData.length > 0 ?
              selectGroupData.map(el => {
                return <Tag
                  className={'tag-selected'}
                  color={'blue'}
                  key={el.id}
                  closable
                  onClose={() => handleRemoveSelect(el)}
                >
                  <AvatarHasName
                    imgId={el.image_id}
                    size={22}
                    name={el.name}
                    icon={<TeamOutlined />}
                  />
                </Tag>
              }) : <EmptyText><span style={{ lineHeight: '34px' }}>Chưa có nhóm nào được chọn</span></EmptyText>
          }
        </div>
        <div className={'modal-body'}>
          <SelectGroupBox />
          <div />
        </div>
      </ModalBody>
    </ModalWrapper>
  )
}

SelectGroupPopup.propTypes = {}

export default inject('selectPeopleStore')(observer(SelectGroupPopup))