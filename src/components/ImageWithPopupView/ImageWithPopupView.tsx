import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { SourceType, PostType } from '../../types/PostType.d'
import Carousel from 'react-elastic-carousel';
import VideoCollage from '../../views/Home/Post/Content/VideoCollage';

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

const VideoConatinerDiv = styled.div`
`

const ImageWithPopupView: FunctionComponent<{ image: SourceType, sources: any, medios: SourceType[] }> = (props) => {
  const { image, sources, medios } = props

  let imgIndex = 0;
  const handleImgIndex = (img: SourceType) => {
    imgIndex = medios.indexOf(img);
  }

  const handleSource = (item: SourceType) => {
    if(!item.accessUrl) {
      return <img loading="lazy" decoding="async" src={item?.resized} alt={item.name} />
    }
    return <VideoConatinerDiv><VideoCollage sources={[item]}/> </VideoConatinerDiv>
  }

  return (
    <>
      <StyledPopup modal trigger={() => 
          {
            handleImgIndex(image)
            return handleSource(image)
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
                {medios.map((item: SourceType) => {
                  if(!item.accessUrl) {
                    return <ImageImg loading="lazy" decoding="async" src={item?.resized} alt={item.name} />
                  }
                  else {
                    return <VideoConatinerDiv><VideoCollage sources={[item]}/> </VideoConatinerDiv>
                  }
                })}
              </Carousel>
            </>
          )
        }}
      </StyledPopup>
    </>
  )
}
export default ImageWithPopupView
