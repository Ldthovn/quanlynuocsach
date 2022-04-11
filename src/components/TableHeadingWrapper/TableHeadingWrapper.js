import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 15px 0;
`

const TableHeadingWrapper = props => {

  const { children } = props

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default TableHeadingWrapper
