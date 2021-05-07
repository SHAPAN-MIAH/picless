import React, { FunctionComponent, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import styled from 'styled-components'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import ImageWithPopupView from '../../../../components/ImageWithPopupView/ImageWithPopupView'
import { SourceType } from '../../../../types/PostType.d'
import * as Utils from '../../../../utils/Functions'
import styles from './PictureCarousel.module.css'
import {PhotoSwipe} from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';

import Popup from 'reactjs-popup'

type PictureCarouselProps = {
  sources: SourceType[]
  amount: number
  blocked: boolean
}

const StyledPopup = styled(Popup)`
  &-content {
    width: auto;
    background-color: rgba(0, 0, 0, 0);
    padding: 0px;
    border: 0px;
  }`

const ContainerBlockedContentDiv = styled.div`
  margin: 15px 25% 0 25%;
`

const PictureCarousel: FunctionComponent<PictureCarouselProps> = React.memo((props) => {
  const { sources, blocked = false, amount } = props
   const [state, setState]  = useState ({
    isOpen: false,
    items: [
      {id: 1, title: 'item #1'},
      {id: 2, title: 'item #2'},
      {id: 3, title: 'item #3'},
      {id: 4, title: 'item #4'},
      {id: 5, title: 'item #5'}
    ]
   })
  
  let items = [
    {
      src: 'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59c4f5655bafe82c692a7052/gato-marron_0.jpg',
      w: 1200,
      h: 900,
      title: 'Image 1'
    },
    {
      src: 'https://www.hogarmania.com/archivos/201811/7-cosas-que-a-tu-gato-no-le-gustan-1280x720x80xX.jpg',
      w: 1200,
      h: 900,
      title: 'Image 2'
    }
  ];
  
  let options = {
    //http://photoswipe.com/documentation/options.html
  };
  
  const handleClose = () => {
    setState({...state, isOpen: false})
  };
  
  const handleOpen = () => {
    setState({...state, isOpen: true})
  }
  

  return (
    <>
      <div className={styles.imageContainer}>
        <Carousel isRTL={false} itemsToShow={1}>
          {items.map(item => <div key={item.title} onClick={handleOpen}><img src={item.src} alt=""/></div>)}
        </Carousel>
        {state.isOpen ? <StyledPopup modal><Carousel isRTL={false} itemsToShow={1}>
                  {items.map(item => <div key={item.title} onClick={handleClose}><img src={item.src} alt=""/></div>)}
         </Carousel></StyledPopup>: ""}
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
