import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, SpinnerWrapper } from './LoadingSpinnerStyled'
import { inject, observer } from 'mobx-react'

const LoadingSpinner = props => {

  const { loadingAnimationStore, commonStore } = props

  const animation = () => {
    return (
      <style>
        {`
        @keyframes loading-spinner {
          0% { transform : translate(-50%, -50%) rotate(0); }
          100% { transform : translate(-50%, -50%) rotate(360deg); }
        }
        `}
      </style>
    )
  }

  return (
    <SpinnerWrapper visible={loadingAnimationStore.isVisible}>
      <Spinner theme={commonStore.appTheme} />
      {animation()}
    </SpinnerWrapper>
  )
}

LoadingSpinner.propTypes = {
  loadingAnimationStore: PropTypes.object,
  commonStore: PropTypes.object,
}

export default inject('loadingAnimationStore', 'commonStore')(observer(LoadingSpinner))
