import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import { inject, observer } from 'mobx-react'

const SpinnerInlineComponent = props => {
  const { loadingAnimationStore, sizeSpin, isLoading, alignItems, tip, noBackground } = props

  const { showSpinInline } = loadingAnimationStore

  const styleSpinWrapper = {
    textAlign: 'center',
    background: noBackground ? 'unset' : 'rgba(44, 101, 172, 0.3)' ,
    position: 'absolute',
    inset: 0,
    display: showSpinInline || isLoading ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: alignItems || 'center',
    paddingTop: alignItems ? 100 : 0,
  }

  return (
    <div style={{ ...styleSpinWrapper }}>
      <Spin size={sizeSpin || 'middle'} tip={tip || 'Đang tải...'} />
    </div>
  )
}

SpinnerInlineComponent.propTypes = {}

export default inject('loadingAnimationStore')(observer(SpinnerInlineComponent))
