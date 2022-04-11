import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Col, Menu, Row } from 'antd'
import ContentBlockWrapper from '../../components/ContentBlockWrapper'
import { AvatarWrapper, InfoWrapper, TitleInfo } from './MyProfilePageStyled'
import { EditOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import UserInfoForm from './Form/UserInfoForm'
import UserEditForm from './Form/UserEditForm'
import UserPasswordForm from './Form/UserPasswordForm'

const MyProfilePage = props => {

  const { authenticationStore } = props
  const { currentUser } = authenticationStore

  const [viewContent, setViewContent] = useState('1')

  const renderContent = useCallback(() => {
    switch (viewContent) {
      case '1':
        return (
          <InfoWrapper>
            <TitleInfo>
              Thông tin của bạn
            </TitleInfo>
            <UserInfoForm />
          </InfoWrapper>
        )
      case '2':
        return (
          <InfoWrapper>
            <TitleInfo>
              Sửa thông tin
            </TitleInfo>
            <UserEditForm userInfo={() => setViewContent('1')} />
          </InfoWrapper>
        )
      case '3':
        return (
          <InfoWrapper>
            <TitleInfo>
              Đổi mật khẩu
            </TitleInfo>
            <UserPasswordForm userInfo={() => setViewContent('1')} />
          </InfoWrapper>
        )
      default:
        return null
    }
  }, [viewContent])

  return (
    <Row gutter={24}>
      <Col span={6}>
        <ContentBlockWrapper>
          <AvatarWrapper>
            <Avatar size={64} />
            <span>
              <h4>{currentUser?.email}</h4>
              <div>{currentUser?.fullName}</div>
            </span>
          </AvatarWrapper>
          <Menu
            defaultSelectedKeys={['1']}
            style={{ border: 'none' }}
            onClick={e => setViewContent(e.key)}
          >
            <Menu.Item key='1' icon={<UserOutlined />}>
              Thông tin tài khoản
            </Menu.Item>
            <Menu.Item key='2' icon={<EditOutlined />}>
              Sửa thông tin tài khoản
            </Menu.Item>
            <Menu.Item key='3' icon={<LockOutlined />}>
              Đổi mật khẩu
            </Menu.Item>
          </Menu>
        </ContentBlockWrapper>
      </Col>
      <Col span={12}>
        <ContentBlockWrapper>
          {renderContent()}
        </ContentBlockWrapper>
      </Col>
    </Row>
  )
}

MyProfilePage.propTypes = {}

export default inject('authenticationStore')(observer(MyProfilePage))
