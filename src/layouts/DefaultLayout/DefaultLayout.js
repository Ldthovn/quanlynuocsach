import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { DefaultLayoutWrapper, MainContent } from './DefaultLayoutStyled'
import MainToolbar from '../../components/MainToolbar'
import MainNavBar from '../../components/MainNavBar'

const DefaultLayout = props => {

  const { children, commonStore } = props
  const { appTheme } = commonStore

  return (
    <DefaultLayoutWrapper>
      <MainToolbar />
      <MainNavBar />
      <MainContent>
        {children}
      </MainContent>
    </DefaultLayoutWrapper>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
}

export default inject(
  'commonStore',
)(observer(DefaultLayout))
