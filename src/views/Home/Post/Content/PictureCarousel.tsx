import React, { FunctionComponent } from 'react'
import Carousel from 'react-elastic-carousel'
import styled from 'styled-components'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import ImageWithPopupView from '../../../../components/ImageWithPopupView/ImageWithPopupView'
import { SourceType } from '../../../../types/PostType.d'
import * as Utils from '../../../../utils/Functions'
import styles from './PictureCarousel.module.css'

type PictureCarouselProps = {
  sources: SourceType[]
  amount: number
  blocked: boolean
}

const ContainerBlockedContentDiv = styled.div`
  margin: 15px 25% 0 25%;
`

const PictureCarousel: FunctionComponent<PictureCarouselProps> = React.memo((props) => {
  const { sources, blocked = false, amount } = props

  return (
    <>
      <div className={styles.imageContainer}>
        <Carousel isRTL={false}>
          {sources.map((item: SourceType) => (
            <div key={Utils.simpleKeyGenerator(5)}>
              <ImageWithPopupView image={item} sources={sources}/>
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
