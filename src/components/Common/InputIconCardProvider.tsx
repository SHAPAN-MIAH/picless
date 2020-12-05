import { IconName } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { ProviderType } from '../../types/PaymentTypes.d'
import { getCardProvider } from '../../utils/Card'

interface InputIconCardProviderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameFormInput?: string
}

const InputIconCardProvider = (props: InputIconCardProviderProps) => {
  const { className, placeholder, id, defaultValue, value, required, classNameFormInput, ...rest } = props

  const [isFocused, setIsFocused] = useState(false)
  const [icon, setIcon] = useState<IconName | null>(null)

  const [showRequired, setShowRequired] = useState(false)

  const inputActive = isFocused || value

  if (defaultValue) {
    throw Error('Dont use defaultValue')
  }

  useEffect(() => {
    const provider = getCardProvider((value as string) || '')

    if (provider === 'VISA') setIcon('cc-visa')
    else if (provider === 'MASTER_CARD') setIcon('cc-mastercard')
    else if (provider === 'AMERICAN_EXPRESS') setIcon('cc-amex')
    else if (provider === 'DINNERS') setIcon('cc-diners-club')
    else if (provider === 'DISCOVER') setIcon('cc-discover')
    else if (provider === 'JCB') setIcon('cc-jcb')
    else setIcon(null)
  }, [value])

  return (
    <div className={classNames('form-input', classNameFormInput, inputActive ? 'active' : '')}>
      <label htmlFor={id}>
        {placeholder} {required && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        value={value}
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
      {icon && (
        <div className="form-input-icon" style={{ fontSize: '34px', position: 'absolute', top: '0px', right: '12px' }}>
          <FontAwesomeIcon color="#3e3f5e" icon={['fab', icon]} />
        </div>
      )}

      {required && showRequired && (
        <p className="inputErrorFieldText">
          <FontAwesomeIcon color="" icon="exclamation-triangle" /> {placeholder} field is required
        </p>
      )}
    </div>
  )
}

export default InputIconCardProvider
