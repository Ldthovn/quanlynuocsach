import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { BoxWrapper, PanelItem } from './SelectGroupBoxStyled'
import { blue } from '../../../color'
import { CaretRightOutlined, SearchOutlined } from '@ant-design/icons'
import { Checkbox, Collapse, Input, message, Tooltip } from 'antd'
import { inject, observer } from 'mobx-react'
import utils from '../../../utils'
import { AvatarHasName } from '../../Common/Avatar'
import { EmptyText } from '../../Common/CellText'

const SelectGroupBox = props => {

  const { loadingAnimationStore, selectPeopleStore } = props
  const { groupList, originGroupList, selectGroupData } = selectPeopleStore

  const handleSearchGroup = useCallback((event) => {
    if (event.target.value.trim() === '') {
      selectPeopleStore.setGroupList(originGroupList)
      return
    }
    const listGroupFilter = originGroupList.filter(group => utils.nonAccentVietnamese(group.name).includes(utils.nonAccentVietnamese(event.target.value)))
    selectPeopleStore.setGroupList(listGroupFilter)
  }, [originGroupList])

  const handleSelectGroup = useCallback((group) => {
    if (!group) return
    const isSelectedGroup = selectGroupData.some(el => el.id === group.groupId)
    if (isSelectedGroup) {
      selectPeopleStore.setSelectGroupData(selectGroupData.filter(el => el.id !== group.groupId))
      return
    }
    selectPeopleStore.setSelectGroupData([
      ...selectGroupData,
      {
        name: group.name,
        id: group.groupId,
      },
    ])
  }, [selectGroupData])

  useEffect(() => {
    (async () => {
      loadingAnimationStore.showSpinner(true)
      try {
        await selectPeopleStore.getGroupList()
      } catch (error) {
        console.log(error)
        message.error(error?.vi || 'Đã có lỗi xảy ra!')
      } finally {
        loadingAnimationStore.showSpinner(false)
      }
    })()
    return () => selectPeopleStore.clearSelectGroupData()
  }, [])

  const handleOpenGroup = async (group) => {
    if (!group || groupList.find(el => el.groupId === group.groupId).users.length > 0) return
    try {
      loadingAnimationStore.setShowSpinInline(true)
      await selectPeopleStore.getMemberGroup(group.groupId)
    } catch (err) {
      message.error(err.vi || 'Đã có lỗi xảy ra!')
      console.log(err)
    } finally {
      loadingAnimationStore.setShowSpinInline(false)
    }
  }

  return (
    <BoxWrapper>
      <div className={'search-box'}>
        <label style={{ fontWeight: 500, marginRight: 10 }}>
          <SearchOutlined style={{ marginRight: 4, color: blue }} />Tìm kiếm:
        </label>
        <Input placeholder={'Nhập tên nhóm...'} style={{ width: 300 }} onChange={(event => handleSearchGroup(event))} />
      </div>
      <div className={'collapse-wrapper'}>
        <Collapse collapsible={'header'}
                  expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>

          {
            groupList.map(group => {
              const checked = selectGroupData.some(el => el.id === group.groupId)
              return <PanelItem
                extra={<div className={'extra'} onClick={() => handleOpenGroup(group)} />}
                checked={checked}
                collapsible
                key={group.groupId}
                header={
                  <Tooltip>
                    <div
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectGroup(group)
                      }}
                      className={`group-item ${checked && 'group-item-checked'}`}>
                      <Checkbox checked={checked} />
                      <span className={'group-name'}>{group.name}</span>
                    </div>
                  </Tooltip>
                }>
                {
                  group.users.length > 0 ? group.users.map(user => {
                      return (
                        <div className={'user-item'} key={user.groupUserId}>
                          <AvatarHasName
                            name={user.user.fullName}
                            imgId={user.image_id} />
                        </div>
                      )
                    }) :
                    <div style={{ padding: '10px 0 10px 60px' }}>
                      <EmptyText>Không có người dùng</EmptyText>
                    </div>
                }
              </PanelItem>
            })
          }
        </Collapse>
      </div>
    </BoxWrapper>
  )
}

SelectGroupBox.propTypes = {}

export default inject('selectPeopleStore', 'loadingAnimationStore')(observer(SelectGroupBox))