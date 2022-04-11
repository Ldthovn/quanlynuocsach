import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { AuthLayoutWrapper, FormWrapper, Logo, Title } from './AuthLayoutStyled'

const AuthLayout = props => {

  const { children, title, commonStore } = props
  const { appTheme } = commonStore

  return (
    <AuthLayoutWrapper bg={`${process.env.PUBLIC_URL}/assets/imgs/auth-bg.png`}>
      <FormWrapper>
        <Logo>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/logo512.png`}
            alt='' height={52}
          />
        </Logo>
        <Title>
          {title}
        </Title>
        {children}
      </FormWrapper>
    </AuthLayoutWrapper>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  commonStore: PropTypes.object,
}

export default inject(
  'commonStore',
)(observer(AuthLayout))
