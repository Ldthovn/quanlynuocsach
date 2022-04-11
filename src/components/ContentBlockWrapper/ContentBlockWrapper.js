import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper } from './ContentBlockWrapperStyled'

const ContentBlockWrapper = props => {

  const { children } = props

  return (
    <Wrapper style={props.style}>
      {children}
    </Wrapper>
  )
}

ContentBlockWrapper.propTypes = {
}

export default ContentBlockWrapper
