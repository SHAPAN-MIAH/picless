import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useState } from 'react'

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  classNameFormInput?: string
  limitMessage?: string
  errorMessage?: string // Used to show messages from react-hook-form
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    placeholder,
    id,
    classNameFormInput,
    value,
    onChange,
    name,
    limitMessage = 'Max Limit',
    errorMessage,
    style: styleContainer,
    ...rest
  } = props

  const [isFocused, setIsFocused] = useState(false)
  const [qtyCharacters, setQtyCharacters] = useState(0)

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQtyCharacters(e.target.value.length)

    if (onChange) onChange(e)
  }

  return (
    <div
      style={styleContainer}
      className={classNames('form-input mid-textarea', classNameFormInput, isFocused || value ? 'active' : '')}
    >
      <label htmlFor={id}>{placeholder}</label>
      <textarea
        id={id}
        name={name}
        ref={ref}
        value={value || ''}
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

      {errorMessage && (
        <p className="inputErrorFieldText">
          <FontAwesomeIcon icon="exclamation-triangle" /> {errorMessage}
        </p>
      )}
    </div>
  )
})

export default TextArea
