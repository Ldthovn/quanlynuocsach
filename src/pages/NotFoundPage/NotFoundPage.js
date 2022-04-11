import React, { Fragment, memo } from 'react'
import { Helmet } from 'react-helmet/es/Helmet'
import { Wrapper } from './NotFoundPageStyled'
import { Button, Result } from 'antd'

const NotFoundPage = props => {

  const { history } = props

  return (
    <Wrapper>
      <Helmet>
        <title>404</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn tìm kiếm không tồn tại!"
        extra={
          <Fragment>
            <Button onClick={() => history.goBack()}>
              Quay lại trang trước
            </Button>
            <Button type={'primary'} onClick={() => history.push('/')}>
              Trở về trang chủ
            </Button>
          </Fragment>
        }
      />
    </Wrapper>
  )
}

export default memo(NotFoundPage)
