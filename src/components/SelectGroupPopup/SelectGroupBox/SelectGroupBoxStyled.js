import styled from 'styled-components'
import { Collapse } from 'antd'

export const BoxWrapper = styled.div`


  .search-box {
    display: flex;
    column-gap: 10px;
    align-items: center;
    margin-bottom: 12px;
  }

  .collapse-wrapper {
    height: calc(100vh - 240px);
    overflow-y: auto;
    position: relative;
  }


`

export const PanelItem = styled(Collapse.Panel)`

  .ant-collapse-header {
    background-color: ${props => props.checked && '#e9f7ff'};
  }

  .ant-collapse-content-box {
    padding: 0;
  }

  .group-name {
    padding-left: 10px;
    font-weight: 500;
  }

  .group-item {
    margin: -13px -17px -12px 0;
    padding: 12px 0;
  }

  .extra {
    position: absolute;
    cursor: pointer;
    width: 40px;
    height: 44px;
    top: 0;
    left: 0;
  }

  .user-item {
    display: flex;
    padding: 10px 0 10px 60px;
    border-bottom: 1px solid #f0f0f0;
  }

`