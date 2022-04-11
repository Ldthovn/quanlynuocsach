import styled from 'styled-components'
import { Tooltip, Tabs } from 'antd'

export const ListUserGroupWrapper = styled.div`

  .ant-collapse-borderless {
    background-color: transparent;

    > .ant-collapse-item {
      border-bottom-color: #f0f0f0;
    }
  }

  .ant-collapse-item-active {
    background: #cddaf4;
  }

  .ant-collapse-header {
    line-height: 27px !important;

    &:hover {
      transition: 0.4s;
      background-color: #cddaf4;
    }
  }
`

export const TabUserGroupWrapper = styled(Tabs)`
  .ant-tabs-nav-list {
    max-height: 82vh;
    overflow: hidden;
  }

  .ant-tabs-tabpane {
    padding-left: 10px !important;
  }

  .ant-tabs-tab-active {
    background-color: #FAFAFA;

    a {
      color: #1890ff !important;
    }

    .edit-icon {
      opacity: 1 !important;
      visibility: visible !important;
    }
  }

  .ant-tabs-tab:hover {
    transition: 0.3s;
    background-color: #FAFAFA;
  }

  .ant-tabs-tab {
    padding-right: 10px;

    .edit-icon {
      opacity: 0;
      visibility: hidden;
      transition: 0.3s;
    }

    &:hover {
      .edit-icon {
        opacity: 1;
        visibility: visible;
      }
    }

    a {
      display: inline-block !important;
      text-align: left;
    }

    .ant-tabs-tab-btn {
      display: flex;
      align-items: center;
    }
  }
`
export const ButtonItemWrapper = styled.div`
  display: ${props => props.isNotAdminGroup ? 'none' : 'flex'};
  justify-content: center;
`

export const ButtonItem = styled(Tooltip)`
  border: 1px solid gainsboro;
  border-radius: 5px;
  width: 27px;
  height: 27px;
  line-height: 29px;
  transition: 0.4s;
  margin-left: 5px;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
`