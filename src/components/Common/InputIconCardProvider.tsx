import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { getCardProvider } from '../../utils/Card'
import ProviderIconCard from './ProviderIconCard'

interface InputIconCardProviderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameFormInput?: string
}

const InputIconCardProvider = React.forwardRef<HTMLInputElement, InputIconCardProviderProps>((props, ref) => {
  const { className, placeholder, id, defaultValue, value, required, classNameFormInput, ...rest } = props

  const [isFocused, setIsFocused] = useState(false)

  const [showRequired, setShowRequired] = useState(false)
  const [provider, setProvider] = useState<string>('')

  const inputActive = isFocused || value

  if (defaultValue) {
    throw Error('Dont use defaultValue')
  }

  useEffect(() => {
    const providerName = getCardProvider((value as string) || '')

    if (providerName) setProvider(providerName)
  }, [value])

  return (
    <div className={classNames('form-input', classNameFormInput, inputActive ? 'active' : '')}>
      <label htmlFor={id}>
        {placeholder} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        value={value}
        ref={ref}
        id={id}
        className={classNames(className, required && showRequired ? 'inputErrorField' : '')}
        onBlur={(e) => {
          setIsFocused(false)
          if (props.onBlur) props.onBlur(e)

          if (!value) {
            setShowRequired(true)
          } else {
            setShowRequired(false)
          }
        }}
        onFocus={(e) => {
          setIsFocused(true)
          if (props.onFocus) props.onFocus(e)
        }}
        required={required}
        size={20}
        minLength={12}
        maxLength={19}
        {...rest}
      />
      {provider && (
        <div className="form-input-icon" style={{ fontSize: '34px', position: 'absolute', top: '0px', right: '12px' }}>
          <ProviderIconCard provider={provider} />
        </div>
      )}

      {required && showRequired && (
        <p className="inputErrorFieldText">
          <FontAwesomeIcon color="red" icon="exclamation-triangle" /> {placeholder} field is required
        </p>
      )}
    </div>
  )
})

export default InputIconCardProvider
