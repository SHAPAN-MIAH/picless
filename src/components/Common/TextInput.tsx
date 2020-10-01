import classNames from 'classnames'
import React, { useState } from 'react'

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement>

export function TextInput(props: TextInputProps) {
  const { className, placeholder, id, defaultValue } = props

  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={classNames('form-input', isFocused || defaultValue ? 'active' : '')}>
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
