import React from 'react'
import classNames from 'classnames'

export interface FormRowProps {
  children: React.ReactNode
  classNameRow?: string
}

const FormRow = (props: FormRowProps) => {
  const { classNameRow } = props

  const { children } = props

  return <div className={classNames('form-row', classNameRow)}>{children}</div>
}

export default FormRow
