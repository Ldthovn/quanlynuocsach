import React from 'react'
import { Tooltip } from 'antd'
import { blue } from '../../color'

export const TextNormal = props =>
  <a style={{
    color: 'rgba(0, 0, 0, .85)',
    display: 'block',
  }}>
    {props.children}
  </a>

export const TextWrap = props =>
  <a style={{
    display: 'block',
    color: 'rgba(0,0,0)',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    width: props.width,
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  }}>{props.children}</a>

export const trimOverlengthString = (string, width) => {

  const style = {
    display: 'block',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    width: width,
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  }

  return (
    <Tooltip title={string}>
      <span style={style}>{string}</span>
    </Tooltip>
  )
}

export const trimOverLengthString = (string, length) => {
  if (string == null) return
  if (string.length >= length) {
    return (
      <Tooltip title={string}>
        {string.substring(0, length).concat('...')}
      </Tooltip>
    )
  }
  return string
}

export const subStringAvatar = name => name?.substring(0, 1).toUpperCase()

export const TitleContentBox = props => {
  const style = {
    fontWeight: 500,
    fontSize: 14,
    margin: '-16px -16px 10px -16px',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: '10px 16px',
    color: '#fff',
    backgroundColor: blue,
  }
  return <h3 style={style}>{props.children}</h3>
}

export const EmptyText = props =>
  <i style={{ color: '#928e8ecc', display: 'inline-block', minWidth: 70 }}>{props.children}</i>

export const WordBreak = (content, isDangerouslySetInnerHTML = false) => {
  const style = {
    wordBreak: 'breakWord',
    whiteSpace: 'pre-line',
  }
  if (isDangerouslySetInnerHTML) {
    return <div style={style} dangerouslySetInnerHTML={{ __html: content }} />
  }
  return <div style={style}>{content}</div>
}