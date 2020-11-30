import classNames from 'classnames'
import React, { CSSProperties } from 'react'

export type AlertType = 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'DANGER' | 'WARNING' | 'INFO' | 'LIGHT' | 'DARK'

interface AlertProps {
  alertType: AlertType
  style?: CSSProperties
  message?: string
  children?: React.ReactNode
}

function Alert(props: AlertProps) {
  const { message, style, alertType, children } = props

  return (
    <div className={classNames('alert', `alert-${alertType.toLowerCase()}`)} role="alert" style={style}>
      {message && <span>{{ message }}</span>}
      {children && <div>{children}</div>}
    </div>
  )
}

export default Alert
