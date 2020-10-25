import classNames from 'classnames'
import React, { useState } from 'react'

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  classNameFormInput?: string
  limitMessage?: string
}

const TextArea = (props: TextAreaProps) => {
  const { placeholder, id, classNameFormInput, defaultValue, onChange, name, limitMessage = 'Max Limit', ...rest } = props

  const [isFocused, setIsFocused] = useState(false)
  const [qtyCharacters, setQtyCharacters] = useState(0)

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQtyCharacters(e.target.value.length)

    if (onChange) onChange(e)
  }

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
        defaultValue={defaultValue}
        onBlur={(e) => {
          setIsFocused(false)
          if (props.onBlur) props.onBlur(e)
        }}
        onFocus={(e) => {
          setIsFocused(true)
          if (props.onFocus) props.onFocus(e)
        }}
        onChange={onChangeHandler}
        {...rest}
      />
      {rest.maxLength && limitMessage && (
        <p className="form-textarea-limit-text">
          {qtyCharacters >= rest.maxLength && <span style={{ color: 'red' }}>{`(${limitMessage}) `}</span>}
          {`${qtyCharacters}/${rest.maxLength}`}
        </p>
      )}
    </div>
  )
}

export default TextArea
