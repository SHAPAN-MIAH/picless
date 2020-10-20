import React from 'react'

type SelectOptionsType = {
  value: string
  name: string
}

interface SelectFormProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOptionsType[]
}

const SelectForm = (props: SelectFormProps) => {
  const { name, placeholder, id, options, ...rest } = props

  // const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="form-select">
      <label htmlFor={id}>{placeholder}</label>
      <select id={id} name={name} {...rest}>
        {options.map((option) => {
          return <option value={option.value}>{option.name}</option>
        })}
      </select>
      <svg className="form-select-icon icon-small-arrow">
        <use xlinkHref="#svg-small-arrow" />
      </svg>
    </div>
  )
}

export default SelectForm
