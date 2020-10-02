import React, { ReactNode } from 'react'
import classNames from 'classnames'

interface FormItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}

const FormItem = (props: FormItemProps) => {
  const { children, className } = props

  return <div className={classNames('form-item', className)}>{children}</div>
}

export default FormItem
