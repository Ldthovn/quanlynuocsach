import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  /** System styling */
  html {
    --antd-wave-shadow-color: ${props => props.theme.solidDarkColor} !important;
  }
  ::selection {
    background: ${props => props.theme.solidDarkColor} !important;
  }
  
  /** Icon */
  .anticon-color {
    color: ${props => props.theme.solidDarkColor} !important;
  }
  
  /** Table */
  .ant-table {
    .current-day {
      background-color: ${props => props.theme.solidLightColor} !important;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #9d9d9d;
    border-radius: 4px;
  }
  
  /** Button */
  .ant-btn {
    &:hover, &:focus {
      color: ${props => props.theme.solidDarkColor} !important;
      border-color: ${props => props.theme.solidDarkColor} !important;
    }transition: all ease .3s;
  }
  .ant-btn-primary {
    &:not(.ant-btn-background-ghost) {
      background: ${props => props.theme.gradientColor} !important;
      border-color: ${props => props.theme.solidDarkColor} !important;
      color: white !important;
      &:hover {
        box-shadow: ${props => props.theme.shadowColor} !important;
      }      
    }
    &.ant-btn-background-ghost {
      background-color: #fff !important;
      color: ${props => props.theme.solidDarkColor} !important;
      border-color: ${props => props.theme.solidDarkColor} !important;
    }
  } 
  .ant-btn-dangerous {
    color: rgb(244, 67, 54) !important;
    border-color: rgb(244, 67, 54) !important;
    &:hover, &:focus {
      color: rgb(244, 67, 54) !important;
      border-color: rgb(244, 67, 54) !important;
      box-shadow: 0 2px 10px rgba(254, 81, 150, 0.5) !important;
    }
    &.ant-btn-primary {
      background: linear-gradient(108.84deg, #F77062 0%, #FE5196 100%) !important;
      color: white !important;
      border-color: rgb(244, 67, 54) !important;
      &:hover {
        box-shadow: 0 2px 10px rgba(254, 81, 150, 0.5) !important;
        border-color: rgb(244, 67, 54) !important;
      }
    }
  }
  
  /** Typography */
  a.ant-typography, .ant-typography a {
    color: ${props => props.theme.solidDarkColor} !important;
  }
  
  /** List */
  .ant-list-item-meta-title {
    a:hover {
      color: ${props => props.theme.solidDarkColor} !important;
    }
  }
  
  /** Popover */
  .ant-popover-buttons  {
    .ant-btn-dangerous {
      background: linear-gradient(108.84deg, #F77062 0%, #FE5196 100%) !important;
      color: white !important;
      border-color: rgb(244, 67, 54) !important;
      &:hover {
        box-shadow: 0 2px 10px rgba(254, 81, 150, 0.5) !important;
        border-color: rgb(244, 67, 54) !important;
      }
    }
  }
  
  /** Input */
  .ant-input-affix-wrapper {
    &:hover {
      border-color: ${props => props.theme.solidDarkColor} !important;
    }
    &:focus, &.ant-input-affix-wrapper-focused {
      border-color: ${props => props.theme.solidDarkColor} !important;
      box-shadow: ${props => props.theme.lightShadowColor} !important;
      outline: none !important;
    }
  }
  textarea.ant-input {
    &:hover {
      border-color: ${props => props.theme.solidDarkColor} !important;
    }
    &:focus {
      border-color: ${props => props.theme.solidDarkColor} !important;
      box-shadow: ${props => props.theme.lightShadowColor} !important;
    }
  }
  .ant-form {
    .ant-input {
      &:hover {
        border-color: ${props => props.theme.solidDarkColor} !important;
      }
      &:focus, &.ant-input-focused {
        outline: none !important;
        border-color: ${props => props.theme.solidDarkColor} !important;
        box-shadow: ${props => props.theme.lightShadowColor} !important;
      }
    }
  }
  .ant-form-item-has-success {
    &.ant-form-item-has-feedback {
      .ant-form-item-children-icon {
        color: ${props => props.theme.solidDarkColor} !important;
      }
    }
  }
  
  /** Password input */
  .ant-input-password {
    padding: 0;
    input {
      padding: 5px 50px 5px 11px !important;
    }
    .ant-input-suffix {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  
  /** Select */
  .ant-select {
    .ant-select-selector {
      align-items: center;
    }
    &:not(.ant-select-disabled) {
      &:hover {
        .ant-select-selector {
          border-color: ${props => props.theme.solidDarkColor} !important;
        }
      }
    }
    &:focus, &.ant-select-focused {
      .ant-select-selector {
        border-color: ${props => props.theme.solidDarkColor} !important;
        outline: none !important;
        box-shadow: ${props => props.theme.lightShadowColor} !important;
      }
    }
  }
  .ant-select-dropdown {
    .ant-select-item-option-selected {
      &:not(.ant-select-item-option-disabled) {
        background-color: ${props => props.theme.solidLightColor} !important;
      }
    }
  }
  
  /** Checkbox */
  .ant-checkbox-wrapper {
    &:hover {
      .ant-checkbox-inner {
        border-color: ${props => props.theme.solidDarkColor} !important;
      }
    }
    .ant-checkbox-checked {
      &:after {
        border-color: ${props => props.theme.solidDarkColor} !important;
      }
      .ant-checkbox-inner {
        background-color: ${props => props.theme.solidDarkColor} !important;
        border-color: ${props => props.theme.solidDarkColor} !important;
      }
    }
  }
  
  /** Switch */
  .ant-switch-checked {
    background: ${props => props.theme.gradientColor} !important;
  }
  
  /** Dropdown */
  .ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title {
    > a {
      color: ${props => props.theme.solidDarkColor} !important;
    }
  }
  .ant-dropdown-link {
    &.ant-dropdown-trigger {
      color: ${props => props.theme.solidDarkColor} !important;
    }
  }
  
  /** Calendar */
  .ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child,
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover,
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    border-color: ${props => props.theme.solidDarkColor} !important;
    color: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover::before,
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
    background-color: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):focus-within {
    box-shadow: ${props => props.theme.lightShadowColor} !important;
  }
  .ant-radio-button-wrapper {
    &:hover {
      color: ${props => props.theme.solidDarkColor} !important;
    }
    &:focus {
      box-shadow: ${props => props.theme.lightShadowColor} !important;
      outline: none;
    }
  }
  .ant-picker-cell-in-view {
    &.ant-picker-cell-selected,
    &.ant-picker-cell-range-start,
    &.ant-picker-cell-range-end {
      .ant-picker-cell-inner {
        &:not(.ant-picker-cell-today) {
          background: ${props => props.theme.solidDarkColor} !important;
          color: white !important;
        }
        &:before {
          border: 1px solid ${props => props.theme.solidDarkColor} !important;
        }
      }
    }
    &.ant-picker-cell-today {
      .ant-picker-cell-inner {
        &:before {
          border: 1px solid ${props => props.theme.solidDarkColor} !important;
        }
      }      
    } 
  }
  .calendar-item {
    &.has-event {
      border-bottom-color: ${props => props.theme.solidDarkColor} !important;
    }
  }
  
  /** Datepicker */
  .ant-picker:hover, .ant-picker-focused {
    border-color: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-picker-focused {
    box-shadow: ${props => props.theme.lightShadowColor} !important;
  }
  .ant-picker-today-btn {
    color: ${props => props.theme.solidDarkColor} !important;
    &:hover {
      color: ${props => props.theme.solidDarkColor} !important;
    }
  }
  .ant-picker-now-btn {
    color: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-picker-range .ant-picker-active-bar {
    background: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-picker-week-panel-row-selected td, .ant-picker-week-panel-row-selected:hover td {
    background: ${props => props.theme.solidLightColor} !important;
  }
  .ant-picker-week-panel-row-selected td .ant-picker-cell-inner, .ant-picker-week-panel-row-selected:hover td .ant-picker-cell-inner {
    color: rgba(0,0,0,.65) !important;
  }
  .ant-picker-week-panel-row-selected td.ant-picker-cell-week, .ant-picker-week-panel-row-selected:hover td.ant-picker-cell-week {
    color: rgba(0,0,0,.25) !important;
  }
  .ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner {
    background: ${props => props.theme.solidLightColor} !important;
  }
  
  /** Pagination */
  .ant-pagination-prev, .ant-pagination-next {
    &:focus, &:hover {
      .ant-pagination-item-link {
        &:not([disabled]) {
          color: ${props => props.theme.solidDarkColor} !important;
        }
      }
    }
  }
  .ant-pagination-item {
    transition: all ease .3s;
    a {
      transition: all ease .3s;
    }
    &:focus, &:hover {
      color: ${props => props.theme.solidDarkColor} !important;
      border-color: ${props => props.theme.solidDarkColor} !important;
      transition: all ease .3s;
      a {
        color: ${props => props.theme.solidDarkColor} !important;
        transition: all ease .3s;
      }
    }
    &-active {
      border-color: ${props => props.theme.solidDarkColor} !important;
      a {
        color: ${props => props.theme.solidDarkColor} !important;
      }
    }
  }
  .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon, 
  .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: ${props => props.theme.solidDarkColor} !important;
  }
  
  /** Timeline */
  .ant-timeline-item-head-blue {
    color: ${props => props.theme.solidDarkColor} !important;
    border-color: ${props => props.theme.solidDarkColor} !important;
  }  
  
  /** Steps */
  .ant-steps-item-process {
    .ant-steps-item-icon {
      background: ${props => props.theme.solidDarkColor} !important;
      border-color: ${props => props.theme.solidDarkColor} !important;
    }
  }
  .ant-steps .ant-steps-item:not(.ant-steps-item-active):not(.ant-steps-item-process) > .ant-steps-item-container[role='button']:hover .ant-steps-item-icon {
    border-color: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-steps-item-finish .ant-steps-item-icon {
    border-color: ${props => props.theme.solidDarkColor} !important;
    > .ant-steps-icon {
      color: ${props => props.theme.solidDarkColor} !important;
    }
  } 
  .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-title, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-subtitle, .ant-steps .ant-steps-item:not(.ant-steps-item-active) > .ant-steps-item-container[role='button']:hover .ant-steps-item-description {
    color: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
    background-color: ${props => props.theme.solidDarkColor} !important;
  }
  
  /** Menu */
  .ant-menu {
    &:not(.ant-menu-horizontal) {
      .ant-menu-item-selected {
        background-color: ${props => props.theme.solidLightColor} !important;
      }
    }
  }
  .ant-menu-inline-collapsed {
    width: 70px;
    .ant-menu-item {
      padding-left: 24px !important;
    }
  }
  .ant-menu-item-selected {
    color: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-menu-item:hover, 
  .ant-menu-item-active, 
  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open, 
  .ant-menu-submenu-active, 
  .ant-menu-submenu-title:hover {
    color: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-menu-submenu-arrow {
    &:before, &:after {
      background: ${props => props.theme.solidDarkColor} !important;
    }
  }
  .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, 
  .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, 
  .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, 
  .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after, 
  .ant-menu-submenu-vertical > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before, 
  .ant-menu-submenu-vertical-left > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before, 
  .ant-menu-submenu-vertical-right > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before, 
  .ant-menu-submenu-inline > .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before {
    background: ${props => props.theme.solidDarkColor} !important;
  }
  .ant-menu-item {
    a:hover {
      color: ${props => props.theme.solidDarkColor} !important;
    }
  }
  .ant-menu-vertical, .ant-menu-vertical-left, .ant-menu-vertical-right, .ant-menu-inline {
    .ant-menu-item::after {
      border-right: 3px solid ${props => props.theme.solidDarkColor} !important;
    }
  }
`
