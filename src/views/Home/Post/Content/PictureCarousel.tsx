import React, { FunctionComponent } from 'react'
import Carousel from 'react-elastic-carousel'
import ImageWithPopupView from '../../../../components/ImageWithPopupView/ImageWithPopupView'
import { SourceType } from '../../../../types/PostType.d'
import * as Utils from '../../../../utils/Functions'
import styles from './PictureCarousel.module.css'

const PictureCarousel: FunctionComponent<{ sources: SourceType[] }> = React.memo((props) => {
  const { sources } = props

  return (
    <>
      <div className={styles.imageContainer}>
        <Carousel isRTL={false}>
          {sources.map((item: SourceType) => (
            <div key={Utils.simpleKeyGenerator(5)}>
              <ImageWithPopupView image={item} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
})

export default PictureCarousel
