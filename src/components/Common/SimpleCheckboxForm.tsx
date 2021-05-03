import React from 'react'

interface SimpleCheckboxForm extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholderHTML?: JSX.Element
}

const SimpleCheckboxForm = React.forwardRef<HTMLInputElement, SimpleCheckboxForm>((props, ref) => {
  const { name, placeholder, placeholderHTML, defaultValue, id, ...rest } = props

  const checked: boolean = defaultValue === 'true'

  return (
    <div className="checkbox-wrap">
      <input type="checkbox" name={name} ref={ref} defaultChecked={checked} id={id || name} {...rest} />

      <div className="checkbox-box">
        <svg className="icon-cross">
          <use xlinkHref="#svg-cross" />
        </svg>
      </div>

      <label htmlFor={id || name}>{placeholder || placeholderHTML}</label>
    </div>
  )
})

export default SimpleCheckboxForm
