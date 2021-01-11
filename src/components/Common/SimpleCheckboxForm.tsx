import React from 'react'

const SimpleCheckboxForm = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const { name, placeholder, defaultValue, id, ...rest } = props

  const checked: boolean = defaultValue === 'true'

  return (
    <div className="checkbox-wrap">
      <input type="checkbox" name={name} ref={ref} defaultChecked={checked} id={id || name} {...rest} />

      <div className="checkbox-box">
        <svg className="icon-cross">
          <use xlinkHref="#svg-cross" />
        </svg>
      </div>

      <label htmlFor={id || name}>{placeholder}</label>
    </div>
  )
})

export default SimpleCheckboxForm
