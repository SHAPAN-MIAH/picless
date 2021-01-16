import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useState } from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameFormInput?: string
  iconName?: string
  errorMessage?: string // Used to show messages from react-hook-form
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    name,
    className,
    placeholder,
    id,
    defaultValue,
    value,
    required,
    classNameFormInput,
    iconName,
    errorMessage,
    ...rest
  } = props

  const [isFocused, setIsFocused] = useState(false)
  const [showRequired, setShowRequired] = useState(false)

  const inputActive = isFocused || value

  if (defaultValue) {
    throw Error('Dont use defaultValue')
  }

  return (
    <>
      <div className={classNames('form-input', classNameFormInput, isFocused || inputActive ? 'active' : '')}>
        <label htmlFor={id}>
          {placeholder} {required && <span style={{ color: 'red' }}>*</span>}
        </label>
        <input
          value={value}
          name={name}
          ref={ref}
          className={classNames(className, required && showRequired ? 'inputErrorField' : '')}
          onBlur={(e) => {
            setIsFocused(false)
            if (props.onBlur) props.onBlur(e)

            if (!value) setShowRequired(true)
            else setShowRequired(false)
          }}
          onFocus={(e) => {
            setIsFocused(true)
            if (props.onFocus) props.onFocus(e)
          }}
          id={id}
          {...rest}
        />

        {iconName && (
          <svg className={`form-input-icon icon-${iconName}`}>
            <use xlinkHref={`#svg-${iconName}`} />
          </svg>
        )}

        {errorMessage && (
          <p className="inputErrorFieldText">
            <FontAwesomeIcon icon="exclamation-triangle" /> {errorMessage}
          </p>
        )}
      </div>
    </>
  )
})

export default TextInput
