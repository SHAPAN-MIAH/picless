import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import * as Utils from '../../utils/Functions'
import TextInput from './TextInput'

export type SelectOptionsType = {
  value: string
  name: string
}

interface SelectFormProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptionsType[]
  readOnly?: boolean
  errorMessage?: string
}

const SelectForm = React.forwardRef<HTMLSelectElement, SelectFormProps>((props, ref) => {
  const { name, defaultValue, placeholder, id, options, readOnly = false, value, errorMessage, required, ...rest } = props

  const readOnlyValue = defaultValue === 0 ? '' : defaultValue

  return (
    <>
      {!readOnly && (
        <div className="form-select">
          <label htmlFor={id}>
            {placeholder} {required && <span style={{ color: 'red' }}>*</span>}
          </label>
          <select id={id} name={name} defaultValue={defaultValue || value || ''} ref={ref} {...rest}>
            {options.map((option) => {
              const key = option.value || Utils.simpleKeyGenerator(5)

              return (
                <option key={key} value={option.value}>
                  {option.name}
                </option>
              )
            })}
          </select>
          <svg className="form-select-icon icon-small-arrow">
            <use xlinkHref="#svg-small-arrow" />
          </svg>
        </div>
      )}

      {readOnly && (
        <TextInput
          type="text"
          id={id}
          classNameFormInput="small"
          name={name}
          placeholder={placeholder}
          value={readOnlyValue}
          readOnly
        />
      )}

      {errorMessage && (
        <p className="inputErrorFieldText">
          <FontAwesomeIcon icon="exclamation-triangle" /> {errorMessage}
        </p>
      )}
    </>
  )
})

export default SelectForm
