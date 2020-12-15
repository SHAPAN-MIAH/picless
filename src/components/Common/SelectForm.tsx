import React, { useEffect } from 'react'
import TextInput from './TextInput'
import * as Utils from '../../utils/Functions'

export type SelectOptionsType = {
  value: string
  name: string
}

interface SelectFormProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptionsType[]
  readOnly?: boolean
}

const SelectForm = (props: SelectFormProps) => {
  const { name, placeholder, id, options, readOnly = false, value, ...rest } = props

  const readOnlyValue = rest.defaultValue === 0 ? '' : rest.defaultValue

  useEffect(() => {
    if (!value || value === '') {
      options.unshift({ value: '', name: 'Select option' })
    }
  }, [options])

  return (
    <>
      {!readOnly && (
        <div className="form-select">
          <label htmlFor={id}>{placeholder}</label>
          <select id={id} name={name} value={value || ''} {...rest}>
            {options.map((option) => {
              const key = option.value || Utils.simpleKeyGenerator(5)

              return (
                <option key={option.value} value={option.value || ''}>
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
    </>
  )
}

export default SelectForm
