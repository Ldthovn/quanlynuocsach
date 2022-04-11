import React from 'react'
import PropTypes from 'prop-types'
import { Empty } from 'antd'

const EmptyContent = props => {

  const { description } = props

  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={description || 'Không có dữ liệu'}
    />
  )
}

EmptyContent.propTypes = {
  description: PropTypes.string,
}

export default EmptyContent
