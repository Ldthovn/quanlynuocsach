import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Dropdown, Menu } from 'antd'

export const MainToolbarWrapper = styled.aside`
  width: 56px;
  height: 100vh;
  background-color: ${props => props.bg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  .ant-menu {
    background-color: transparent;
    width: 100%;
    border-right: none;

    .ant-menu-item {
      color: white !important;
      text-align: center;

      .anticon {
        font-size: 18px;
      }
    }
  }
`
export const UserAvatar = styled(Link)`
  width: 32px;
  height: 32px;

  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`
export const TopMenu = styled(Menu)`
  margin-bottom: auto;
  margin-top: 15px;
`
export const BottomMenu = styled(Dropdown)`
  color: white;
  font-size: 18px;
`
