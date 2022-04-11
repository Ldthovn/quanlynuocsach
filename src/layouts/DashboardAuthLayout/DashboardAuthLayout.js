import React from 'react'
import PropTypes from 'prop-types'
import { DashboardAuthLayoutWrapper, DashboardAuthLayoutContent } from './DashboardAuthLayoutStyled'
import MainToolbar from '../../components/MainToolbar'

const DashboardAuthLayout = props => {

  const { children } = props

  return (
    <DashboardAuthLayoutWrapper>
      <MainToolbar />
      <DashboardAuthLayoutContent>
        {children}
      </DashboardAuthLayoutContent>
    </DashboardAuthLayoutWrapper>
  )
}

DashboardAuthLayout.propTypes = {
  children: PropTypes.node,
}

export default DashboardAuthLayout
