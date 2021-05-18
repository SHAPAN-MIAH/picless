import React, { FunctionComponent } from 'react'
import Carousel from 'react-elastic-carousel'
import styled from 'styled-components'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import ImageWithPopupView from '../../../../components/ImageWithPopupView/ImageWithPopupView'
import { SourceType, PostType } from '../../../../types/PostType.d'
import * as Utils from '../../../../utils/Functions'
import styles from './PictureCarousel.module.css'

type PictureCarouselProps = {
  amount: number
  blocked: boolean,
  allData: PostType
}

const ContainerBlockedContentDiv = styled.div`
  margin: 15px 25% 0 25%;
`

const PictureCarousel: FunctionComponent<PictureCarouselProps> = React.memo((props) => {
  const { blocked = false, amount, allData } = props

  const listImages: SourceType[] = allData.images || []
  const listVideos: SourceType[] = allData.videos || []

  let media: any = [];
  listImages.map((images: SourceType) => {
    media.push(images)
  })
  listVideos.map((videos: SourceType) => {
    media.push(videos)
  })

  return (
    <>
      <div className={styles.imageContainer}>
        <Carousel isRTL={false}>
          {media.map((item: SourceType) => (
            <div key={Utils.simpleKeyGenerator(5)}>
              <ImageWithPopupView image={item}  medios={media}/>
            </div>
          ))}
        </Carousel>
      </div>
      {blocked && (
        <ContainerBlockedContentDiv>
          <ButtonWithLoader type="button" className="small primary" showLoader={false}>
            Unlock Content for $ {amount}
          </ButtonWithLoader>
        </ContainerBlockedContentDiv>
      )}
    </>
  )
})

export default PictureCarousel
