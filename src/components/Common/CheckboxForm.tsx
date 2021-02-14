/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

interface CheckboxFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string
  description?: string
  onChange: any
}

const CheckboxForm = React.forwardRef<HTMLInputElement, CheckboxFormProps>((props, ref) => {
  const { id, name, title, description, checked = false, onChange, ...rest } = props

  const [checkState, setCheckState] = useState(checked)

  useEffect(() => {
    setCheckState(checked)
  }, [checked])

  let controlStyle = {}

  if (!description) {
    controlStyle = {
      top: '-7px',
    }
  }

  return (
    <div className="switch-option" id={id}>
      <p className="switch-option-title">{title}</p>

      {description && <p className="switch-option-text">{description}</p>}

      <div
        className={classNames('form-switch', checkState ? 'active' : '')}
        style={controlStyle}
        onClick={() => {
          onChange(!checkState)
          setCheckState(!checkState)
        }}
      >
        <div className="form-switch-button" />
      </div>

      <input {...rest} type="checkbox" name={name} ref={ref} checked={checkState} id={id} style={{ display: 'none' }} />
    </div>
  )
})

export default CheckboxForm
