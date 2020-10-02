import classNames from 'classnames'
import React, { useState } from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameFormInput?: string
}

function TextInput(props: TextInputProps) {
  const { className, placeholder, id, defaultValue, classNameFormInput } = props

  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={classNames('form-input', classNameFormInput, isFocused || defaultValue ? 'active' : '')}>
      <label htmlFor={id}>{placeholder}</label>
      <input
        {...props}
        placeholder=""
        className={classNames(isFocused ? ' ' : ' ', className)}
        onBlur={(e) => {
          setIsFocused(false)
          if (props.onBlur) props.onBlur(e)
        }}
        onFocus={(e) => {
          setIsFocused(true)
          if (props.onFocus) props.onFocus(e)
        }}
      />
    </div>
  )
}

export default TextInput
