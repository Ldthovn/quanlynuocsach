import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Input, message, Row } from 'antd'
import TableFooterWrapper from '../../../components/TableFooterWrapper/TableFooterWrapper'
import { inject, observer } from 'mobx-react'

const UserPasswordForm = props => {

  const { authenticationStore, userInfo } = props
  const [form] = Form.useForm()

  const onFinish = useCallback(values => {
    const { oldPassword, newPassword } = values
    authenticationStore.updateCurrentUserPassword(oldPassword, newPassword)
      .then(() => {
        form.resetFields()
        return authenticationStore.getCurrentUser()
          .then(() => Promise.resolve())
          .catch(error => console.log('error get current user', error))
      })
      .then(() => {
        message.success('Mật khẩu đã được đổi!')
      })
      .catch(error => message.error(error?.response?.data?.message))
  }, [])

  return (
    <Form
      form={form}
      id={'change-password-profile'}
      layout={'vertical'}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={13}>
          <Form.Item
            label={'Mật khẩu cũ'}
            name={'oldPassword'}
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password placeholder={'Nhập mật khẩu cũ'} />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label={'Mật khẩu mới'}
            name={'newPassword'}
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password placeholder={'Nhập mật khẩu mới'} />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label={'Xác nhận lại mật khẩu mới'}
            name={'confirmPassword'}
            dependencies={['newPassword']} hasFeedback
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu của bạn!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Hai mật khẩu bạn đã nhập không khớp!'))
                },
              }),
            ]}
          >
            <Input.Password placeholder={'Nhập lại mật khẩu mới'} />
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

UserPasswordForm.propTypes = {
  userInfo: PropTypes.func,
}

export default inject('authenticationStore')(observer(UserPasswordForm))
