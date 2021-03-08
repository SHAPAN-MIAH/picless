import React, { FunctionComponent } from 'react'
import Carousel from 'react-elastic-carousel'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { SourceType } from '../../../../types/PostType.d'
import * as Utils from '../../../../utils/Functions'
import { imageUrl } from '../../../../utils/ResourceHelpers'
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
              <Popup
                trigger={<img loading="lazy" decoding="async" src={imageUrl(item.pathName)} alt={item.name} />}
                {...{ contentStyle }}
                modal
              >
                {/* <ImageView name={item.pathName} blocked={false} />
                {console.log(item.pathName)}
                {console.log(item.name)} */}
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
