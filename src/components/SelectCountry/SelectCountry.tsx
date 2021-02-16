import React from 'react'
import SelectForm from '../Common/SelectForm'

import countries from '../../constants/countries.json'

const SelectCountry = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => {
  return <SelectForm {...props} ref={ref} options={countries} />
})

export default SelectCountry
