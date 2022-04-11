import React, { useCallback, useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

const LoginForm = props => {
  const { authenticationStore } = props
  const { appToken } = authenticationStore
  const history = useHistory()
  const [loginForm] = Form.useForm()

  const onLogin = async info => {
    const { username, password } = info
    try {
      await authenticationStore.userLogin(username, password)
      const response = await authenticationStore.getCurrentUser()
      message.success(`Xin chào, ${response.fullName}!`)
    } catch (error) {
      console.log('Get current user error: ', error)
    }
  }

  useEffect(() => {
    if (appToken) history.push('/')
  }, [appToken])

  return (
    <Form form={loginForm} layout={'vertical'} onFinish={onLogin}>
      <Form.Item
        name={'username'}
        label={'Tên đăng nhập'}
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}>
        <Input placeholder={'Tên đăng nhập'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        label={'Mật khẩu'}
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
        <Input.Password placeholder={'Mật khẩu'} />
      </Form.Item>
      <Button type={'primary'} htmlType={'submit'} block>
        ĐĂNG NHẬP
      </Button>
    </Form>
  )
}

LoginForm.propTypes = {}

export default inject('authenticationStore')(observer(LoginForm))
