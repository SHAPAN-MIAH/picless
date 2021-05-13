import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { SourceType, PostType } from '../../types/PostType.d'
import Carousel from 'react-elastic-carousel';
import VideoCollage from '../../views/Home/Post/Content/VideoCollage';
import VideoPlayer from '../../views/Home/Post/Content/TestVideo';

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

const ImageWithPopupView: FunctionComponent<{ image: SourceType, sources: any, medios: SourceType[] }> = (props) => {
  const { image, sources, medios } = props

  const [isDisabled, setDisabled] = useState(false)
  let imgIndex = 0;
  const handleImgIndex = (img: SourceType) => {
    imgIndex = medios.indexOf(img);
  }

  const videoJsOptions = {
    autoplay: false,
    width: '100%',
    controls: true,
    responsive: true,
    fill: true,
    fluid: true,
    controlBar: { 
      'pictureInPictureToggle': false
     },
  };

  return (
    <>
      <StyledPopup modal trigger={() => 
          {
            handleImgIndex(image)
            if(!image.accessUrl) {
              setDisabled(false)
              return <img loading="lazy" decoding="async" src={image?.resized} alt={image.name} />
            }
            else {
              setDisabled(true)
            return (
              <div className="video-triger-pop"> 
                  <VideoPlayer src='https://s3-image-dev.s3-eu-west-1.amazonaws.com/hls/Marcus.m3u8' type='' options={videoJsOptions}  />
              </div>)
              }
            }

        } disabled={isDisabled}>
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
                    return<div className="video-triger-pop">  
                            <VideoPlayer src='https://s3-image-dev.s3-eu-west-1.amazonaws.com/hls/Marcus.m3u8' type='' options={videoJsOptions}/>
                          </div>
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
