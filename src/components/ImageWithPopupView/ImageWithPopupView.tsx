import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { SourceType } from '../../types/PostType.d'
import Carousel from 'react-elastic-carousel'
import VideoPlayer from '../../assets/js/VideoPlayer'
import * as Utils from '../../utils/Functions'
import { useHistory } from 'react-router-dom'

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
  margin-bottom: 2px;
`

const ImagePop = styled.img`
  max-height: 100vh !important;
  max-width: 99%;
  object-fit: contain;
`

const CloseButtonDiv = styled.div`
  position: absolute;
  bottom: 50px;
  margin-left: calc(100% - 60px);
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0px 0px #333;
  color: rgba(245, 245, 245, 1);
  height: 30px;
  min-width: 30px;
  line-height: 30px;
  z-index: 9;
  border-radius: 50%;
  text-align: center;
}
`

const ImageWithPopupView: FunctionComponent<{ image: SourceType; medios: SourceType[]; isDisabled: boolean; userName: string }> = (props) => {
  const { image, medios, isDisabled, userName } = props
  const history = useHistory();
  const pathname = history.location.pathname;

  const [width, setwidht] = useState<number>(window.document.getElementsByClassName('content-grid')[0].clientWidth)

  let imgIndex = 0
  const handleImgIndex = (img: SourceType) => {
    imgIndex = medios.indexOf(img)
  }
  const videoJsOptions = {
    autoplay: false,
    width: '100%',
    controls: true,
    responsive: true,
    fill: true,
    fluid: true,
    controlBar: {
      pictureInPictureToggle: false,
    },
  }

  const handleOpen = () => {
    document.body.style.overflow = 'hidden'
  }

  const handleClose = () => {
    document.body.style.overflow = 'auto'
  }

  const handleClick = (e: any) => {
    if (e.target.tagName === 'DIV') {
      return true
    }
    return false
  }

  const getWidth = () => { 
    const imgs = medios.filter(el => !el.accessUrl)
    let index:any = imgs[0]
    imgs.map(image => {
        if(image.index && index.index && (image.index < index.index)) {
          index = image
        }
    })
    return index;
  }
  const initialImage = getWidth();

  const height = initialImage ? initialImage.heightResized : 0

  const maximoComunDivisor = (width: number, height: number): any => {
    if (height === 0) return width
    return maximoComunDivisor(height, width % height)
  }

  const base = maximoComunDivisor(width, height)
  const numerator = Math.round(width / base)
  const denominator = Math.round(height / base)
  const appearance = `${numerator}:${denominator}` !== 'NaN:NaN' ? `${numerator}:${denominator}` : '16:9'
  
  const handleWidht = () => {
    setwidht(window.document.getElementsByClassName('content-grid')[0].clientWidth)
  }

  window.addEventListener('resize', handleWidht);
  
  return (
    <>
      <StyledPopup
        modal
        onClose={handleClose}
        onOpen={handleOpen}
        trigger={() => {
          handleImgIndex(image)
          if (!image.accessUrl) {
            return <ImageImg loading="lazy" decoding="async" src={image?.resized} alt={image.name}/>
          } else {
            return (
              <div className="video-triger-pop">
                <VideoPlayer src={image.accessUrl} type="" options={videoJsOptions} aspect={appearance} />
              </div>
            )
          }
        }}
        disabled={isDisabled}
      >
        {(close: any) => {
          return (
            <div
              onClick={(event) => {
                handleClick(event) === true && close()
              }}
            >
              <CloseButtonDiv
                onClick={() => {
                  close()
                }}
              >
                <FontAwesomeIcon icon="times" color="white" size="1x" />
              </CloseButtonDiv>
              <Carousel isRTL={false} initialActiveIndex={imgIndex} pagination={false} className='carousel-phater'>
                {medios.map((item: SourceType) => {
                  const routeTo = `/u/${userName}/post/${item.postId}`;
                  const LinkPost = routeTo !== pathname ?
                    <a href={routeTo} className='goToPost'>Go to Post</a>: '';
                  if (!item.accessUrl) {
                    return (
                      <div key={Utils.simpleKeyGenerator(5)} className='containerLink'>
                        <ImagePop
                          loading="lazy"
                          decoding="async"
                          src={item?.original}
                          alt={item.name}
                        />
                        {
                          LinkPost
                        }
                      </div>
                    )
                  } else {
                    return (
                      <div key={Utils.simpleKeyGenerator(5)} className='containerLink'>
                        <div key={Utils.simpleKeyGenerator(5)} className="video-triger-pop">
                          <VideoPlayer src={item.accessUrl} type="" options={videoJsOptions} />
                        </div>
                        {
                          LinkPost
                        }
                      </div>
                    )
                  }
                })}
              </Carousel>
            </div>
          )
        }}
      </StyledPopup>
    </>
  )
}
export default ImageWithPopupView
