import React, { FunctionComponent } from 'react'
import Carousel from 'react-elastic-carousel'
import ButtonWithLoader from '../../../../Common/ButtonWithLoader'
import ImageWithPopupView from '../../../../ImageWithPopupView/ImageWithPopupView'

import { SourceType, PostType } from '../../../../../types/PostType.d'

import styles from './PictureCarousel.module.css'

type PictureCarouselProps = {
  allData: PostType
}

const PictureCarousel: FunctionComponent<PictureCarouselProps> = (props) => {
  const { allData } = props

  let media: any = []
  let isDisabled = false

  const listImages: SourceType[] = allData.images || []
  const listVideos: SourceType[] = allData.videos || []

  listImages.map((images: SourceType) => {
    media.push(images)
  })
  listVideos.map((videos: SourceType) => {
    media.push(videos)
  })

  const page = media.length > 1 ? true : false

  const handleDisable = (item: SourceType) => {
    if (!item.accessUrl) {
      isDisabled = false
    } else {
      isDisabled = true
    }
  }

  return (
    <>
      <div className={styles.imageContainer}>
        <Carousel isRTL={false} pagination={page}>
          {media.map((item: SourceType) => (
            <div key={item.id}>
              {handleDisable(item)}
              <ImageWithPopupView image={item} medios={media} isDisabled={isDisabled} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default React.memo(PictureCarousel)
