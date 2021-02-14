import React, { FunctionComponent } from 'react'
import Carousel from 'react-elastic-carousel'
import Popup from 'reactjs-popup'

import { imageUrl } from '../../../../utils/ResourceHelpers'
import * as Utils from '../../../../utils/Functions'

import { SourceType } from '../../../../types/PostType.d'

import 'reactjs-popup/dist/index.css'
import styles from './PictureCarousel.module.css'

const PictureCarousel: FunctionComponent<{ sources: SourceType[] }> = (props) => {
  const { sources } = props

  const contentStyle = { width: '75%', height: '75%' }

  return (
    <>
      <div className={styles.imageContainer}>
        <Carousel isRTL={false}>
          {sources.map((item: SourceType) => (
            <div key={Utils.simpleKeyGenerator(5)}>
              <Popup trigger={<img src={imageUrl(item.pathName)} alt={item.name} />} {...{ contentStyle }} modal>
                <img src={imageUrl(item.pathName)} alt={item.name} className={styles.imagePopup} />
                <a href={imageUrl(item.pathName)} target="_blank" rel="noopener noreferrer">
                  Open Original
                </a>
              </Popup>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default PictureCarousel
