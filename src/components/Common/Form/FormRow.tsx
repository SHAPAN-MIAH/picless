import React from 'react'
import classNames from 'classnames'

export interface FormRowProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  classNameRow?: string
}

const FormRow = (props: FormRowProps) => {
  const { classNameRow, children, ...rest } = props

  return (
    <div className={classNames('form-row', classNameRow)} {...rest}>
      {children}
    </div>
  )
}

export default FormRow
