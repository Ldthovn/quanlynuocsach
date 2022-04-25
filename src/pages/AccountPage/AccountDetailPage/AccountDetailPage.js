import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

const AccountDetailPage = props => {
  const { commonStore } = props

  useEffect(() => {
    commonStore.setPageName(['/accounts'])
  }, [])

  return <div>Account Detail Page</div>
}

AccountDetailPage.propTypes = {}

export default inject('commonStore')(observer(AccountDetailPage))
