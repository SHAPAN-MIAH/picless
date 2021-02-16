import React, { FunctionComponent } from 'react'

interface CountryFlagProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  code: string
}

// React.InputHTMLAttributes<HTMLInputElement>

const CountryFlag: FunctionComponent<CountryFlagProps> = (props) => {
  const { code, alt, ...rest } = props

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/assets/img/flags/${code}.svg`} alt={alt} {...rest} />
    </>
  )
}

export default CountryFlag
