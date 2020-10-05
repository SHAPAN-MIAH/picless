import classNames from 'classnames'
import React from 'react'

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  classNameFormInput?: string
}

const TextArea = (props: TextAreaProps) => {
  const { placeholder, id, classNameFormInput, name, ...rest } = props

  return (
    <div className={classNames('form-input', classNameFormInput)}>
      <textarea id={id} name={name} placeholder={placeholder} {...rest} />
    </div>
  )
}

export default TextArea
