import React from 'react'
import PropTypes from 'prop-types'
import { TableWrapper } from './Table'
import { Table } from 'antd'

const TableComponent = props => {
  return (
    <TableWrapper>
      <Table {...props} />
    </TableWrapper>
  )
}

TableComponent.propTypes =
  {}

export default TableComponent