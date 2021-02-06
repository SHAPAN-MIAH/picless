/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, useRef } from 'react'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'
import { imageUrl } from '../../../../utils/ResourceHelpers'

import { SourceType } from '../../../../types/PostType.d'

import 'react-image-gallery/styles/css/image-gallery.css'
// import styles from './PictureGallery.module.css'

const mapToImageGallery = (sources: SourceType[]): ReactImageGalleryItem[] => {
  return sources.map((item: SourceType) => {
    return {
      original: imageUrl(item.pathName),

      originalTitle: item.name,
    }
  })
}

const PictureGallery: FunctionComponent<{ sources: SourceType[] }> = (props) => {
  const galleryRef = useRef(null)
  const { sources } = props

  const images = mapToImageGallery(sources)

  return (
    <>
      <div style={{}}>
        <ImageGallery
          ref={galleryRef}
          items={images}
          showPlayButton={false}
          showNav={false}
          showThumbnails={false}
          useBrowserFullscreen={false}
        />
      </div>
    </>
  )
}

export default PictureGallery
