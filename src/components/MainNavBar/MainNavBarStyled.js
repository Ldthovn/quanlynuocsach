import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

export const MainNavBarWrapper = styled.nav`
  width: 280px;
  padding: 24px;
  background-color: ${props => props.bg};
  position: fixed;
  top: 0;
  left: 56px;
  bottom: 0;
`
export const LogoWrapper = styled(Link)`
  display: block;
  text-align: center;
`
export const MenuWrapper = styled(Menu)`
  background-color: transparent;
  margin-top: 25px;
  border-right: none;
  &:not(.ant-menu-horizontal) {
    .ant-menu-item-selected {
      background-color: ${props => props.theme.solidColor} !important;
      border-right-color: ${props => props.theme.solidDarkColor} !important;
    }
  }
  .ant-menu-item {
    color: ${props => props.theme.solidDarkColor} !important;
    font-weight: 600;
    width: 100%;
    border-right: 3px solid transparent;
    &:after {
      display: none;
    }
  }
  .ant-menu-submenu {
    &.ant-menu-submenu-open {
      .ant-menu-submenu-title {
        background-color: ${props => props.theme.solidColor} !important;
      }
    }
    .ant-menu-submenu-title {
      color: ${props => props.theme.solidDarkColor} !important;
      width: 100%;
      margin-bottom: 0;
      font-weight: 600;
    }
    .ant-menu-sub {
      background-color: #d6deef;
      .ant-menu-item {
        color: rgba(0, 0, 0, 0.65) !important;
        font-weight: normal !important;
        margin: 0;
        height: 45px;
        line-height: 45px;
        &.ant-menu-item-selected {
          background-color: transparent !important;
        }
      }
    }
  }
`
