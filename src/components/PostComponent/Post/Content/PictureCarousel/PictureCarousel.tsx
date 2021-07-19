import React, { FunctionComponent, useRef } from 'react'
import Carousel from 'react-elastic-carousel'
import ButtonWithLoader from '../../../../Common/ButtonWithLoader'
import ImageWithPopupView from '../../../../ImageWithPopupView/ImageWithPopupView'
import styled from 'styled-components'

import { SourceType, PostType } from '../../../../../types/PostType.d'

import styles from './PictureCarousel.module.css'


const CountContainerDiv = styled.div`
  position: absolute;
  top: 7px;
  margin-left: calc(100% - 65px);
  font-size: 12px;
  background-color: rgba(245, 245, 245, 0.7);
  box-shadow: 0 0 0px 0px #111;
  color: rgba(0, 0, 0, 0.5);
  height: 22px;
  min-width: 22px;
  line-height: 22px;
  z-index: 9;
  border-radius: 10%;
  text-align: center;
}
`

type PictureCarouselProps = {
  allData: PostType
}

const PictureCarousel: FunctionComponent<PictureCarouselProps> = (props) => {
  const { allData } = props

  const carouselRef = useRef<any>(null);

  let mediaContainer: any = []
  let media: any = []
  let isDisabled = false

  const listImages: SourceType[] = allData.images || []
  const listVideos: SourceType[] = allData.videos || []

  listImages.map((images: SourceType) => {
    mediaContainer.push(images)
  })
  listVideos.map((videos: SourceType) => {
    mediaContainer.push(videos)
  })

  mediaContainer.map((el: any) => {
    media[el.index] = el;
  })

  const userName = allData.users.userName;
  const page = media.length > 1 ? true : false

  const handleDisable = (item: SourceType) => {
    if (!item.accessUrl) {
      isDisabled = false
    } else {
      isDisabled = true
    }
  }
  const swipe = media.length > 1 ? true : false;

  return (
    <>
      <div className={styles.imageContainer}>
        <Carousel 
          ref={carouselRef}
          isRTL={false}
          pagination={page}
          enableSwipe={swipe}
          renderPagination={({ pages, activePage}) => {
          return (
            <CountContainerDiv>
              {`${activePage+1}/${pages.length}`}
            </CountContainerDiv>
          )
        }}
        >
          {media.map((item: SourceType) => (
            <div key={item.id}>
              {handleDisable(item)}
              <ImageWithPopupView image={item} medios={media} isDisabled={isDisabled} userName={userName} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default React.memo(PictureCarousel)
