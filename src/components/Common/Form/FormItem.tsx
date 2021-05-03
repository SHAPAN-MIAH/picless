import React, { ReactNode } from 'react'
import classNames from 'classnames'

interface FormItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode
}

const FormItem = (props: FormItemProps) => {
  const { children, className, ...rest } = props

  return (
    <div className={classNames('form-item', className)} {...rest}>
      {children}
    </div>
  )
}

export default FormItem
