import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import Alert from '../../../../components/Common/Alerts/Alerts'
import LiquidImage from '../../../../components/Common/LiquidImage'
import useProfile from '../../../../hooks/useProfile'
import * as Utils from '../../../../utils/Functions'
import { isMobile } from 'react-device-detect'
import VideoPlayer from '../../../../assets/js/VideoPlayer'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import Carousel from 'react-elastic-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './VideoGalleryTab..css'
import './PhotoGalleryTabs.css'
import vi from 'date-fns/esm/locale/vi/index.js'

const noVideos = 'Nothing to show'

const ImageContainerDiv = styled.div`
  width: 100%;
  height: 100%;
`
const ImageImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`
const StyledPopup = styled(Popup)`
  &-content {
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    padding: 0px;
    margin: 0 !important;
    border: 0px;
  }
`

const CloseButtonDiv = styled.div`
    position: absolute;
    bottom: 50px;
    margin-left: calc(100% - 40px);
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

const ImagePop = styled.img`
  max-height: 100vh;
  max-width: 99%;
  object-fit: contain;
`

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)
const VideoGalleryTab: FunctionComponent<{}> = () => {
  const { getVideos, videos, provider } = useProfile({ disableMount: true })
  const [page, setPage] = useState<number>(0)
  const [values, setOpen] = useState({ open: false, index: 0 })

  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setOpen({ ...values, open: false })
  }

  const getVideoList = useCallback(() => {
    getVideos(page).then(() => {
      setPage(page + 1)
    })
  }, [getVideos, setPage, page])

  useEffect(() => {
    if (provider && videos && videos.length === 0) {
      getVideoList()
      if (window.tpl) {
        window.tpl.load(['dropdown'])
      }
    }
  }, [])

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

  let imgIndex = 0
  const handleOpen = () => {
    document.body.style.overflow = 'hidden'
  }

  const handleVideiIndex = (img: any) => {
    imgIndex = videos.indexOf(img)
    setOpen({ open: true, index: imgIndex })
  }
 

  const handleClick = (e: any) => {
    if (e.target.tagName === 'DIV') {
      closeModal()
    }
  }

  const maximoComunDivisor = (width: number, height: number): any => {
    if (height === 0) return width
    return maximoComunDivisor(height, width % height)
  }

  const setApparence = (width = 0, height = 0) => {
    if (isMobile && height > (width*2)) {
      return '9:16'
    }
    const base = maximoComunDivisor(width, height)
    const numerator = Math.round(width / base)
    const denominator = Math.round(height / base)
    return  `${numerator}:${denominator}` !== 'NaN:NaN' ? `${numerator}:${denominator}` : '16:9'
  }

  const setVideoPlayer = (accessUrl: any, id: any) => {
   return <VideoPlayer
      src={accessUrl}
      type=""
      options={videoJsOptions}
      aspect={setApparence(window.innerWidth, window.innerHeight)}
      videoThreshol ={.7}
      videoId={id}
    />  
  }

  const handlePause = (item: any) => {
    item?.pause();
  }

  const handleFullScream = () => {

  }

  const handleSelect = (id: string) => {
    handlePause(document.getElementById(`${id}_html5_api`));  
  }

  const handleSelectFullScream = () => {
      
  }

  window.addEventListener('resize', handleSelectFullScream);


  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="widget-box widget-videos">
          {videos.length === 0 && <Alert alertType="PRIMARY" message={noVideos} style={{ width: '100%' }} />}
            {videos.length > 0 && (
              <>
                <InfiniteScroll dataLength={videos.length} next={getVideoList} hasMore loader={LoaderDiv}>
                  <div className="grid grid-3-3-3-3 centered grid-photos" style={{ overflow: 'hidden' }}>
                    {videos.map((item) => {
                      return (
                        <div key={item.id} className="album-preview" onClick={() => handleVideiIndex(item)}>
                          <ImageContainerDiv>
                            <ImageImg
                              src={item.thumbnail}
                              alt={item.name}
                              onError={(e: any) => {
                                e.target.onerror = null
                                e.target.src = Utils.imgError
                              }}
                            />
                          </ImageContainerDiv>
                        </div>
                      )
                    })}
                  </div>
                </InfiniteScroll>
                {
                  <StyledPopup modal open={values.open} onClose={closeModal} onOpen={handleOpen}>
                    <div onClick={(event) => handleClick(event)}>
                      <CloseButtonDiv
                        onClick={() => {
                          closeModal()
                        }}
                      >
                        <FontAwesomeIcon icon="times" color="white" size="1x" />
                      </CloseButtonDiv>
                      <Carousel
                        isRTL={false}
                        initialActiveIndex={values.index}
                        pagination={false}
                        onNextEnd={(currentItem) => {
                          if (currentItem.index + 4 >= videos.length) {
                            getVideoList()
                          }
                        }}
                        className="class-up"
                        onNextStart={(
                          prevItemObject: any
                        ) => {
                          handleSelect(prevItemObject.item['data-id'])
                        }}
                        onPrevStart={(
                          prevItemObject: any
                        ) => {
                          handleSelect(prevItemObject.item['data-id'])
                        }}
                      >
                        {videos.map((item) => {
                          let ids = Utils.simpleKeyGenerator(8);
                          let videoPlied = setVideoPlayer(item.accessUrl, ids)
                          return (
                            <div 
                              key={item.id}
                              className='containerLink'
                              data-id={ids}
                            >
                              <div 
                                key={item.id}
                                data-vjs-player
                                style={{width: window.innerWidth}}
                              >
                                {videoPlied}
                              </div>
                              <a href={`/u/${provider.userName}/post/${item.postId}`} className='goToPost'>Go to Post</a>
                            </div>
                          )
                        })}
                      </Carousel>
                    </div>
                  </StyledPopup>
                }
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoGalleryTab
