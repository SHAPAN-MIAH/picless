import classNames from 'classnames'
import React, { useState } from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameFormInput?: string
  iconName?: string
}

const TextInput = (props: TextInputProps) => {
  const { className, placeholder, id, defaultValue, classNameFormInput, iconName, ...rest } = props

  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={classNames('form-input', classNameFormInput, isFocused || defaultValue ? 'active' : '')}>
      <label htmlFor={id}>{placeholder}</label>
      <input
        defaultValue={defaultValue}
        id={id}
        className={classNames(isFocused ? ' ' : ' ', className)}
        onBlur={(e) => {
          setIsFocused(false)
          if (props.onBlur) props.onBlur(e)
        }}
        onFocus={(e) => {
          setIsFocused(true)
          if (props.onFocus) props.onFocus(e)
        }}
        {...rest}
      />

      {iconName && (
        <svg className={`form-input-icon icon-${iconName}`}>
          <use xlinkHref={`#svg-${iconName}`} />
        </svg>
      )}
    </div>
  )
}

export default TextInput
