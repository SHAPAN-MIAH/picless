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

import './VideoGalleryTab..css'

const noVideos = 'Nothing to show'

const StyledPopup = styled(Popup)`
  &-content {
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    padding: 0px;
    margin: 0 !important;
    border: 0px;
  }
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

  const options = {
    fill: true,
    fluid: true,
    responsive: true,
    preload: 'auto',
    controls: true,
    controlBar: {
      pictureInPictureToggle: false,
    },
  }
  const handleOpen = () => {
    document.body.style.overflow = 'hidden'
  }

  /*const handleClick = (e: any) => {
    if (e.target.tagName === 'DIV') {
      closeModal()
    }
  }

  const handleImgIndex = (img: any) => {
    imgIndex = photos.indexOf(img)
    setOpen({ open: true, index: imgIndex })
  }*/

  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="widget-box widget-videos">
          {videos.length === 0 && <Alert alertType="PRIMARY" message={noVideos} style={{ width: '100%' }} />}
            {videos.length > 0 && (
              <>
                <InfiniteScroll dataLength={videos.length} next={getVideoList} hasMore loader={LoaderDiv}>
                  <div className="grid grid-3-3-3-3 centered grid-videos" style={{ overflow: 'hidden' }}>
                    {videos.map((item) => {
                      return (
                        <div key={item.id} className="album-preview">
                          {/*<div key={item.id} data-vjs-player>
                            <VideoPlayer src={item.accessUrl} type="" options={options} aspect='3:4'/>
                          </div>*/}
                          <div style={{width: '100%', height: 'auto'}}>
                            <img
                              src={item.resized}
                              className='tumbail-video'
                              alt={item.name}
                              onError={(e: any) => {
                                e.target.onerror = null
                                e.target.src = Utils.imgError
                              }}
                              onClick={() => handleOpen(item)}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </InfiniteScroll>
                {/*<StyledPopup modal open={values.open} onClose={closeModal} onOpen={handleOpen}>
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
                          if (currentItem.index + 4 >= photos.length) {
                            getPhotosList()
                          }
                        }}
                        className="class-up"
                      >
                        {photos.map((item) => {
                          return (
                            <div key={item.id} className='containerLink'>
                              <ImagePop
                                decoding="async"
                                src={item?.original}
                                alt={item.name}
                                onError={(e: any) => {
                                  e.target.onerror = null
                                  e.target.src = Utils.imgError
                                }}
                              />
                              <a href={`/u/${provider.userName}/post/${item.postId}`} className='goToPost'>Go to Post</a>
                            </div>
                          )
                        })}
                      </Carousel>
                    </div>
                  </StyledPopup>*/}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoGalleryTab
