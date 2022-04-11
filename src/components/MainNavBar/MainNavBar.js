import React, { useCallback, useEffect, useState } from 'react'
import { LogoWrapper, MainNavBarWrapper, MenuWrapper } from './MainNavBarStyled'
import { inject, observer } from 'mobx-react'
import { Menu } from 'antd'
import { ControlOutlined, HomeOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { toJS } from 'mobx'

const { SubMenu } = Menu

const MainNavBar = props => {
  const { commonStore, authenticationStore } = props
  const { appTheme, pageName } = commonStore
  const { currentUser } = authenticationStore

  const history = useHistory()

  const isRoleAdmin = currentUser?.roles.includes('ROLE_ADMIN')

  const [openKeys, setOpenKeys] = useState([])

  const handleNavigate = useCallback(data => {
    commonStore.setPageName([data.key])
    history.push(data.key)
  }, [])
  const handleOpenMenuGroup = useCallback(data => {
    setOpenKeys(data)
  }, [])

  const menuManageAccount = (
    <SubMenu
      key="cd-manage"
      title={
        <>
          <ControlOutlined />
          <span>Quản trị</span>
        </>
      }>
      <Menu.Item key="/connected-document/manage/account">
        Tài khoản công nhân
      </Menu.Item>
      <Menu.Item key="/manage/user-group">Danh sách hộ gia đình</Menu.Item>
    </SubMenu>
  )

  useEffect(() => {
    const pageNameStr = toJS(pageName).toString()
    if (pageNameStr.indexOf('/manage/') !== -1) setOpenKeys(['cd-manage'])
    if (pageNameStr.indexOf('/utility/') !== -1) setOpenKeys(['cd-utility'])
  }, [pageName])
  useEffect(() => {
    authenticationStore.getCurrentUser().catch(error => console.log(error))
  }, [authenticationStore])

  return (
    <MainNavBarWrapper bg={appTheme.solidLightColor}>
      <LogoWrapper to={'/'}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/header_logo.svg`}
          alt="Logo"
          height={70}
        />
      </LogoWrapper>
      <MenuWrapper
        selectedKeys={pageName}
        openKeys={openKeys}
        onClick={handleNavigate}
        onOpenChange={openKeys => handleOpenMenuGroup(openKeys)}
        theme={appTheme}
        mode="inline">
        <Menu.Item key={'/'}>
          <HomeOutlined />
          <span>Trang chủ</span>
        </Menu.Item>
        {isRoleAdmin ? menuManageAccount : null}
      </MenuWrapper>
    </MainNavBarWrapper>
  )
}

export default inject(
  'commonStore',
  'authenticationStore'
)(observer(MainNavBar))
