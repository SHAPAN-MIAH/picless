import React, { FunctionComponent } from 'react'
import Carousel from 'react-elastic-carousel'
import 'reactjs-popup/dist/index.css'
import { SourceType } from '../../../../types/PostType.d'
import * as Utils from '../../../../utils/Functions'
import styles from './PictureCarousel.module.css'

const PictureCarousel: FunctionComponent<{ sources: SourceType[] }> = (props) => {
  const { sources } = props

  // const contentStyle = { width: '75%', height: '75%' }

  return (
    <>
      <div className={styles.imageContainer}>
        <Carousel isRTL={false}>
          {sources.map((item: SourceType) => (
            <div key={Utils.simpleKeyGenerator(5)}>
              <img loading="lazy" decoding="async" src={item?.resized} alt={item.name} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default PictureCarousel
