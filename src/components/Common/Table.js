import styled from 'styled-components'

export const TableWrapper = styled.div`
  .ant-spin-nested-loading {
    background-color: white;
  }

  .ant-table-tbody {
    .ant-table-row {
      cursor: pointer;
    }
  }

  .ant-table-thead > tr > th {
    background-color: #2C65AC;
    color: white;
  }

  tr:nth-child(2n + 3) {
    .ant-table-cell-fix-right.ant-table-cell-fix-right-first {
      background: #fff !important;
    }
  }

  tr:nth-child(even) {
    background: #E9F0FD;

    .ant-table-cell-fix-right.ant-table-cell-fix-right-first {
      background: #E9F0FD !important;
    }
  }

  .ant-table-tbody > tr.ant-table-row-level-0:hover > td {
    background: transparent;
  }

  .ant-comment-inner {
    padding: 0;
    align-items: center;

    .ant-comment-content-author {
      margin-bottom: 0;
    }
  }

  .ant-comment-content-author a, .ant-comment-content-author span {
    font-size: 14px;
    font-weight: 500;
    color: black;
  }
`

export const CellEclipseBox = styled.div`
  white-space: nowrap;
  max-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const TableBottomPaginationBlock = styled.div`
  margin: 20px 0 0;
  .ant-pagination {
    text-align: right;
  }
`

export const TableHeaderCenter = styled.span`
  text-align: center;
  display: block;
`