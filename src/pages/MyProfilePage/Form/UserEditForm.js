import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, message, Row } from 'antd'
import { inject, observer } from 'mobx-react'
import TableFooterWrapper from '../../../components/TableFooterWrapper'

const UserEditForm = props => {

  const { authenticationStore, userInfo, loadingAnimationStore } = props
  const { currentUser } = authenticationStore
  const [form] = Form.useForm()

  const onFinish = useCallback(values => {
    const { fullName } = values
    loadingAnimationStore.showSpinner(true)
    authenticationStore.updateCurrentUserInfo(fullName)
      .then(() => {
        authenticationStore.getCurrentUser()
          .then(() => Promise.resolve())
          .catch(error => console.log('error get current user', error))
      })
      .then(() => {
        loadingAnimationStore.showSpinner(false)
        message.success('Cập nhật thông tin tài khoản thành công!')
      })
      .catch(() => {
        loadingAnimationStore.showSpinner(false)
        message.error('Cập nhật thông tin tài khoản không thành công!')
      })
  }, [currentUser])

  useEffect(() => {
    const { fullName, email, userName } = currentUser
    form.setFieldsValue({
      fullName: fullName,
      email: email,
      userName: userName,
    })
  }, [currentUser])

  return (
    <Form
      form={form}
      layout={'vertical'}
      name={'update-info-form'}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={13}>
          <Form.Item
            label={'Họ và tên'}
            name={'fullName'}
            rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label={'Tên tài khoản'}
            name={'userName'}
            rules={[{ required: true, message: 'Tên tài khoản không được để trống!' }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label={'Email'}
            name={'email'}
            rules={[{ required: true, message: 'Email không được để trống!' }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item>
            <TableFooterWrapper>
              <Button
                style={{ marginRight: '16px' }}
                type={'danger'}
                ghost
                onClick={userInfo}
              >
                Hủy bỏ
              </Button>
              <Button type={'primary'} htmlType={'submit'}>Lưu thay đổi</Button>
            </TableFooterWrapper>
          </Form.Item>
        </Col>
      </Row>
    </Form>

  )
}

UserEditForm.propTypes = {
  userInfo: PropTypes.func,
}

export default inject('authenticationStore', 'loadingAnimationStore')(observer(UserEditForm))
