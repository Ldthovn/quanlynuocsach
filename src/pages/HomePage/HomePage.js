import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Helmet } from 'react-helmet/es/Helmet'

const HomePage = props => {
  const { commonStore } = props

  useEffect(() => {
    commonStore.setPageName(['/'])
  }, [])

  return (
    <>
      <Helmet>
        <title>Trang chủ | Quản lý nước sạch</title>
      </Helmet>
      <h1
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '56px'
        }}>
        Trang chủ
      </h1>
    </>
  )
}

export default inject('commonStore')(observer(HomePage))
