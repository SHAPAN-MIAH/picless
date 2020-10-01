import React from 'react'
import classNames from 'classnames'
import FormRow, { FormRowProps } from './FormRow'

export interface FormItemProps extends FormRowProps {
  classNameItem?: string
}

const FormItem = (props: FormItemProps) => {
  const { classNameRow, classNameItem } = props

  const { children } = props

  return (
    <FormRow classNameRow={classNameRow}>
      <div className={classNames('form-item', classNameItem)}>{children}</div>
    </FormRow>
  )
}

export default FormItem
