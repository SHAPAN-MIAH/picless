import React, { FunctionComponent } from 'react'
import ImageHelper from '../../utils/ImageHelpers'

interface ImageViewProps {
  name: string
  blocked: boolean
}

const ImageView: FunctionComponent<ImageViewProps> = (props) => {
  const { name, blocked = false } = props

  const url = ImageHelper.getUrl(name, blocked)
  console.log(url)
  return (
    <>
      <img src={url} alt={name} />
    </>
  )
}

export default ImageView
