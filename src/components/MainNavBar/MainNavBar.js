import React, { useCallback, useEffect, useState } from 'react'
import { LogoWrapper, MainNavBarWrapper, MenuWrapper } from './MainNavBarStyled'
import { inject, observer } from 'mobx-react'
import { Menu } from 'antd'
import {
  AccountBookOutlined,
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { toJS } from 'mobx'

const MainNavBar = props => {
  const { commonStore } = props
  const { appTheme, pageName } = commonStore

  const history = useHistory()

  const [openKeys, setOpenKeys] = useState([])

  // useEffect(() => {
  //   const pageNameStr = toJS(pageName).toString()
  //   console.log('pageNameStr', pageNameStr)
  //   if (pageNameStr.indexOf('/accounts/') !== -1) setOpenKeys(['accounts'])
  // }, [pageName])

  const handleNavigate = data => {
    commonStore.setPageName([data.key])
    history.push(data.key)
  }

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
        theme={appTheme}
        mode="inline">
        <Menu.Item key={'/'}>
          <HomeOutlined />
          <span>Trang chủ</span>
        </Menu.Item>
        <Menu.Item key={'/accounts'}>
          <AccountBookOutlined />
          <span>Tài khoản công nhân</span>
        </Menu.Item>
        <Menu.Item key={'/household'}>
          <UserOutlined />
          <span>Danh sách hộ dân</span>
        </Menu.Item>
      </MenuWrapper>
    </MainNavBarWrapper>
  )
}

export default inject('commonStore')(observer(MainNavBar))
