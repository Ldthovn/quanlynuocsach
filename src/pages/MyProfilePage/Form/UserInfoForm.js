import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { inject, observer } from 'mobx-react'

const UserInfoForm = props => {

  const { authenticationStore } = props
  const { currentUser } = authenticationStore

  return (
    <Form layout={'vertical'}>
      <Form.Item label={'Họ và tên'}>
        <span>{currentUser?.fullName}</span>
      </Form.Item>
      <Form.Item label={'Tên tài khoản'}>
        <span>{currentUser?.userName}</span>
      </Form.Item>
      <Form.Item label={'Email'}>
        {currentUser?.email}
      </Form.Item>
    </Form>
  )
}

UserInfoForm.propTypes = {}

export default inject('authenticationStore')(observer(UserInfoForm))
