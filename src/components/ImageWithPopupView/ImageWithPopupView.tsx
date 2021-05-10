import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { SourceType } from '../../types/PostType.d'
import Carousel from 'react-elastic-carousel';

import './imageWithPopupView.css'

const StyledPopup = styled(Popup)`
  &-content {
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    padding: 0px;
    border: 0px;
  }
`

const ImageImg = styled.img`
  max-height: 100vh;
  max-width: 100%;
  margin-right: auto;
  margin-left: auto;
`

const CloseButtonDiv = styled.div`
  position: absolute;
  width: 35px;
  height: 35px;
  background-color: #615dfa;
  margin-left: calc(100% - 30px);
  top: 0;
  margin-top: -10px;
  border-radius: 5px;
  text-align: center;
  padding-top: 5px;
  cursor: pointer;
  z-index: 9;
`

const ImageWithPopupView: FunctionComponent<{ image: SourceType, sources: any }> = (props) => {
  const { image, sources } = props

  const [values, setvalues] = useState({imgIndex: 0})

  let imgIndex = 0;
  const handleImgIndex = (img: SourceType) => {
    imgIndex = sources.indexOf(img);
  }

  return (
    <>
      <StyledPopup modal trigger={() => 
          {
            handleImgIndex(image)
            return <img loading="lazy" decoding="async" src={image?.resized} alt={image.name} />
          }
        } >
        {(close: any) => {
          return (
            <>
             <CloseButtonDiv
                onClick={() => {
                  close()
                }}
              >
                <FontAwesomeIcon icon="times" color="white" size="1x" />
              </CloseButtonDiv>
              <Carousel isRTL={false} initialActiveIndex={imgIndex} pagination={false} itemPosition={'CENTER'}>
                {sources.map((item: SourceType) => (
                    <ImageImg loading="lazy" decoding="async" src={item?.resized} alt={item.name} />
                ))}
              </Carousel>
            </>
          )
        }}
      </StyledPopup>
    </>
  )
}
export default ImageWithPopupView
