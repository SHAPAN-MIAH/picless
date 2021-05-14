import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { SourceType, PostType } from '../../types/PostType.d'
import Carousel from 'react-elastic-carousel';
import VideoPlayer from '../../assets/js/VideoPlayer';

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
  margin: calc(5%) 0 0 0;
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

const ImageWithPopupView: FunctionComponent<{ image: SourceType, medios: SourceType[] }> = (props) => {
  const { image, medios } = props

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

  const width = medios[0].width ? medios[0].width : 0
  const height = medios[0].height ? medios[0].height : 0;


  const maximoComunDivisor = (width:number, height:number): any => {
    if (height === 0) return width;
    return maximoComunDivisor(height, width % height);
};

  const base = maximoComunDivisor(width, height);
  const numerator = width/base;
  const denominator = height/base;


  const appearance = `${numerator}:${denominator}`;

  const srd = [
    "https://s3-image-dev.s3-eu-west-1.amazonaws.com/hls/vide.m3u8",
    "https://s3-image-dev.s3-eu-west-1.amazonaws.com/hls/Marcus.m3u8"
  ]

  return (
    <>
      <StyledPopup modal trigger={() => 
          {
            handleImgIndex(image)
            if(!image.accessUrl) {
              setDisabled(false)
              return <ImageImg loading="lazy" decoding="async" src={image?.resized} alt={image.name}/>
            }
            else {
              setDisabled(true)
              console.log()
            return (
              <div className="video-triger-pop"> 
                  <VideoPlayer src={srd[Math.round(Math.random() * (1 - 0) + 0)]} type='' options={videoJsOptions} aspect={appearance}  />
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
                            <VideoPlayer src='https://s3-image-dev.s3-eu-west-1.amazonaws.com/hls/vide.m3u8' type='' options={videoJsOptions}/>
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
