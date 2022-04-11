import React, { useCallback, useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import Helmet from 'react-helmet/es/Helmet'
import LoginForm from '../../components/LoginForm'

const AuthModule = props => {
  const { match } = props

  const { authType } = match.params

  const [pageTitle, setPageTitle] = useState('')
  const [formTitle, setFormTitle] = useState('')
  const [content, setContent] = useState(null)

  const renderFormContent = useCallback(() => {
    switch (authType) {
      case 'login':
        setPageTitle('Đăng nhập | Quản lý nước sạch')
        setFormTitle('Đăng nhập')
        setContent(<LoginForm />)
        return
    }
  }, [authType])

  useEffect(() => {
    renderFormContent()
  }, [authType])

  return (
    <AuthLayout title={formTitle}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      {content}
    </AuthLayout>
  )
}

export default AuthModule
