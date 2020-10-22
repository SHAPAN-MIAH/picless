/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, useState } from 'react'
import classNames from 'classnames'

type CheckboxFormProps = {
  id: string
  title: string
  description?: string
  checked: boolean
  onChange: any
}

const CheckboxForm: FunctionComponent<CheckboxFormProps> = (props) => {
  const { id, title, description, checked = false, onChange } = props

  const [checkState, setCheckState] = useState(checked)

  return (
    <div className="switch-option" id={id}>
      <p className="switch-option-title">{title}</p>

      <p className="switch-option-text">{description}</p>

      <div
        className={classNames('form-switch', checkState ? 'active' : '')}
        onClick={() => {
          onChange(!checkState)
          setCheckState(!checkState)
        }}
      >
        <div className="form-switch-button" />
      </div>
    </div>
  )
}

export default CheckboxForm
