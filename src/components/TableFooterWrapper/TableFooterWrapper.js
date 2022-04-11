import React from 'react'
import { inject, observer } from 'mobx-react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 15px 0 0;
  ${props => props.footerModal && css`
    justify-content: space-between;
  `}
`

const TableFooterWrapper = props => {

  const { children, footerModal, commonStore } = props
  const { isEditMode } = commonStore

  return (
    <Wrapper footerModal={isEditMode ? null : footerModal}>
      {children}
    </Wrapper>
  )
}

export default inject('commonStore')(observer(TableFooterWrapper))
