<<<<<<< HEAD
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
=======
import React, { FunctionComponent } from 'react'

interface LiquidImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imgReference?: React.RefObject<HTMLImageElement>
  //onImageLoad?: (image: any) => void
}

const LiquidImage: FunctionComponent<LiquidImageProps> = (props) => {
  const { src, className, alt, imgReference } = props

  return (
    <>
      <figure className={className} style={{ background: `url("${src}") no-repeat center`, backgroundSize: 'cover' }}>
        {imgReference ? (
          <img ref={imgReference} src={src} alt={alt} style={{ display: 'none' }} />
        ) : (
          <img src={src} alt={alt} style={{ display: 'none' }} />
        )}

        {props.children}
      </figure>
    </>
  )
}

export default LiquidImage
>>>>>>> stage-5
