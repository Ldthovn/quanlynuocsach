import React, { useCallback, useMemo } from 'react'
import { inject, observer } from 'mobx-react'
import { BottomMenu, MainToolbarWrapper, TopMenu, UserAvatar } from './MainToolbarStyled'
import { Menu, message } from 'antd'
import { useHistory } from 'react-router-dom'
import { AppstoreOutlined, LogoutOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'

const MainToolbar = props => {

  const { commonStore, authenticationStore } = props
  const { appTheme } = commonStore
  const history = useHistory()

  const handleLogout = useCallback(() => {
    authenticationStore.userLogout()
      .then(() => {
        history.push('/auth/login')
        message.info('Bạn đã đăng xuất!')
      })
  }, [])

  const overlayMenu = useMemo(() => (
    <Menu>
      <Menu.Item onClick={() => history.push('/my-profile')}>
        <UserOutlined />
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Item style={{ color: 'red' }} onClick={handleLogout}>
        <LogoutOutlined />
        Đăng xuất
      </Menu.Item>
    </Menu>
  ), [])

  return (
    <MainToolbarWrapper bg={appTheme.solidDarkColor}>
      <UserAvatar to={'/my-profile'}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/imgs/default-avatar.jpg`}
          alt='Avatar'
        />
      </UserAvatar>
      <TopMenu>
        <Menu.Item key={'1'}>
          <SearchOutlined />
        </Menu.Item>
        <Menu.Item key={'2'} onClick={() => history.push('/')}>
          <AppstoreOutlined />
        </Menu.Item>
      </TopMenu>
      <BottomMenu overlay={overlayMenu} placement='topLeft' arrow>
        <a style={{ color: 'white' }}><SettingOutlined /></a>
      </BottomMenu>
    </MainToolbarWrapper>
  )
}

export default inject(
  'commonStore',
  'authenticationStore',
)(observer(MainToolbar))
