import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input, message, Modal, Space } from 'antd'
import { inject, observer } from 'mobx-react'
import TableFooterWrapper from '../TableFooterWrapper'

const CreateEditUserForm = props => {

  const { commonStore, modalVisibleProps, modalCancelProps, userStore, loadingAnimationStore } = props
  const { isEditMode, count } = commonStore
  const { userDetail } = userStore
  const [form] = Form.useForm()

  const submitCreateForm = useCallback(async values => {
    try {
      loadingAnimationStore.showSpinner(true)
      await userStore.createUser(values)
      await userStore.getUserList()
      handleCancelForm()
      message.success('Tạo tài khoản thành công!')
    } catch (error) {
      console.log(error)
      message.error(error?.vi || 'Đã có lỗi xảy ra!')
    } finally {
      loadingAnimationStore.showSpinner(false)
    }
  }, [])
  const submitEditForm = useCallback(async values => {
    const { email, fullName, password } = values
    const dataEdit = { email: email, fullName: fullName }
    const passwordNew = { passwordNew: password }
    try {
      loadingAnimationStore.showSpinner(true)
      await userStore.updateUser(userDetail.id, dataEdit)
      if (password) {
        await userStore.updateUserPassword(userDetail.id, passwordNew)
      }
      await userStore.getUserList()
      handleCancelForm()
      message.success('Cập nhật tài khoản thành công!')
    } catch (error) {
      console.log(error)
      message.error(error?.vi || 'Đã có lỗi xảy ra!')
    } finally {
      loadingAnimationStore.showSpinner(false)
    }
  }, [userDetail])

  const handleCancelForm = useCallback(() => {
    form.resetFields()
    modalCancelProps()
  }, [])
  const onReset = useCallback(() => {
    form.resetFields()
  }, [])

  useEffect(() => {
    const { email, fullName, password, userName } = userDetail
    if (isEditMode) {
      form.setFieldsValue({
        email: email,
        fullName: fullName,
        password: password,
        userName: userName,
      })
    }

    return () => form.setFieldsValue({
      email: '',
      fullName: '',
      password: '',
      userName: '',
    })
  }, [userDetail, isEditMode])

  return (
    <Modal
      title={isEditMode ? 'Cập nhật thông tin tài khoản' : 'Thêm mới tài khoản'}
      visible={modalVisibleProps}
      onCancel={modalCancelProps}
      footer={false}
      afterClose={onReset}
      destroyOnClose
      forceRender
    >
      <Form
        form={form}
        layout={'vertical'}
        id={'edit-create-user'}
        onFinish={isEditMode ? submitEditForm : submitCreateForm}

      >
        <Form.Item
          label={'Họ và tên:'}
          name={'fullName'}
          rules={[
            { required: true, message: 'Vui lòng nhập họ và tên!' },
          ]}
        >
          <Input
            autoComplete={'new-password'}
            placeholder={'Nhập họ và tên'}
          />
        </Form.Item>
        <Form.Item
          label={'Tên tài khoản:'}
          name={'userName'}
          rules={[
            { required: true, message: 'Vui lòng nhập tên tài khoản!' },
          ]}
        >
          <Input
            autoComplete={'new-password'}
            disabled={isEditMode}
            placeholder={'Nhập tên tài khoản'}
          />
        </Form.Item>
        <Form.Item
          label={'Email:'}
          name={'email'}
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
          ]}

        >
          <Input
            autoComplete={'new-password'}
            placeholder={'Email'}
          />
        </Form.Item>
        {
          isEditMode ? (
            <Form.Item
              label={'Mật khẩu:'}
              name={'password'}
            >
              <Input.Password
                autoComplete={'new-password'}
                placeholder={'Mật khẩu'}
              />
            </Form.Item>
          ) : (
            <Form.Item
              label={'Mật khẩu:'}
              name={'password'}
              rules={[{ required: true, message: 'Vui lòng nhập nhập khẩu!' }]}
            >
              <Input.Password
                autoComplete={'new-password'}
                placeholder={'Mật khẩu'}
              />
            </Form.Item>
          )
        }
        <TableFooterWrapper footerModal>
          <Button type={'danger'} ghost onClick={handleCancelForm}>Hủy bỏ</Button>
          <Space size={'middle'}>
            <Button style={isEditMode ? { display: 'none' } : { display: 'block' }} onClick={onReset}>Nhập lại</Button>
            <Button
              type={'primary'}
              htmlType={'submit'}
              form={'edit-create-user'}
            >
              {isEditMode ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </Space>
        </TableFooterWrapper>
      </Form>
    </Modal>
  )
}

CreateEditUserForm.propTypes = {}

export default inject('commonStore', 'userStore', 'loadingAnimationStore')(observer(CreateEditUserForm))
