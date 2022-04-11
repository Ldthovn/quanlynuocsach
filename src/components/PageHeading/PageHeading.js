import React from 'react'
import PropTypes from 'prop-types'
import { PageHeadingWrapper } from './PageHeadingStyled'
import { Tooltip } from 'antd'

const PageHeading = props => {

  const { title, children } = props

  const renderTitle = string => {
    if (string && children) {
      if (string.length < 50) {
        return string
      }
      return (
        <Tooltip title={string}>
          {string.substring(0, 50).concat('...')}
        </Tooltip>
      )
    }
    return string
  }

  return (
    <PageHeadingWrapper>
      <h1>{renderTitle(title)}</h1>
      {children}
    </PageHeadingWrapper>
  )
}

PageHeading.propTypes = {
  title: PropTypes.string,
}

export default PageHeading
