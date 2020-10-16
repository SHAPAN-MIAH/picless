import classNames from 'classnames'
import React, { useState } from 'react'

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  classNameFormInput?: string
}

const TextArea = (props: TextAreaProps) => {
  const { placeholder, id, classNameFormInput, defaultValue, name, ...rest } = props

  const [isFocused, setIsFocused] = useState(false)

  return (
    // <div className={classNames('form-input', classNameFormInput)}>
    //   <textarea id={id} name={name} placeholder={placeholder} {...rest} />
    // </div>
    <div
      className={classNames('form-input small mid-textarea', classNameFormInput, isFocused || defaultValue ? 'active' : '')}
    >
      <label htmlFor={id}>{placeholder}</label>
      <textarea
        id={id}
        name={name}
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
    </div>
  )
}

export default TextArea
