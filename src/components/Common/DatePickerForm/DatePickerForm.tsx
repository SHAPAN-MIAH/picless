import React from 'react'
import classNames from 'classnames'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import styles from './DatePickerForm.module.css'
import 'react-datepicker/dist/react-datepicker.css'

interface DatePickerFormProps extends ReactDatePickerProps {
  classNameFormInput?: string
  iconName?: string
}

const DatePickerForm = React.forwardRef<HTMLInputElement, DatePickerFormProps>((props, ref) => {
  const { classNameFormInput, id, placeholderText, iconName, customInputRef, ...rest } = props

  const InputText: React.FunctionComponent<any> = ({ value, onClick }) => (
    <div className={classNames('form-input', classNameFormInput, value ? 'active' : '')}>
      <label htmlFor={id}>{placeholderText}</label>
      <input type="text" ref={ref} defaultValue={value} onClick={onClick} />
      {iconName && (
        <svg className={`form-input-icon icon-${iconName}`}>
          <use xlinkHref={`#svg-${iconName}`} />
        </svg>
      )}
    </div>
  )

  return (
    <DatePicker
      placeholderText={placeholderText}
      id={id}
      wrapperClassName={styles.datePickerFix}
      customInputRef={customInputRef}
      customInput={<InputText />}
      {...rest}
    />
  )
})

export default DatePickerForm
