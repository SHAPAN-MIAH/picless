import React, { FunctionComponent } from 'react'

const LiquidImage: FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const { src, className, alt } = props

  return (
    <>
      <figure className={className} style={{ background: `url("${src}") no-repeat center`, backgroundSize: 'cover' }}>
        <img src={src} alt={alt} style={{ display: 'none' }} />
      </figure>
    </>
  )
}

export default LiquidImage
