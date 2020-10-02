import React from 'react'
import FormRow, { FormRowProps } from './FormRow'
import FormItem from './FormItem'

interface FormRowItemProps extends FormRowProps {
  classNameRow?: string
  classNameItem?: string
}

const FormRowItem = (props: FormRowItemProps) => {
  const { classNameRow, classNameItem } = props

  const { children } = props

  return (
    <FormRow classNameRow={classNameRow}>
      <FormItem className={classNameItem}>{children}</FormItem>
    </FormRow>
  )
}

export default FormRowItem
