import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import Alert from '../../../../components/Common/Alerts/Alerts'
import useProfile from '../../../../hooks/useProfile'
import { isMobile } from 'react-device-detect'
import Carousel from 'react-elastic-carousel'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Utils from '../../../../utils/Functions'

import './PhotoGalleryTabs.css'

const noPhotos = 'Nothing to show'

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

const ImagePop = styled.img`
  max-height: 100vh;
  max-width: 99%;
  object-fit: contain;
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

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const PhotoGalleryTab: FunctionComponent<{}> = () => {
  const { getPhotos, photos, provider } = useProfile({ disableMount: true })

  const [page, setPage] = useState<number>(0)
  const [itemId, setItemId] = useState<number>(0)

  const [values, setOpen] = useState({ open: false, index: 0 })
  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setOpen({ ...values, open: false })
    setItemId(0)
  }

  const getPhotosList = useCallback(() => {
    getPhotos(page).then(() => {
      setPage(page + 1)
    })
  }, [getPhotos, setPage, page])

  useEffect(() => {
    if (provider && photos && photos.length === 0) {
      getPhotosList()
      if (window.tpl) {
        window.tpl.load(['dropdown'])
      }
    }
  }, [])

  let imgIndex = 0
  const handleImgIndex = (img: any) => {
    imgIndex = photos.indexOf(img)
    setOpen({ open: true, index: imgIndex })
  }

  const handleOpen = () => {
    document.body.style.overflow = 'hidden'
    setItemId(photos[values.index].postId ?? 0);
  }

  const handleClick = (e: any) => {
    if (e.target.tagName === 'DIV') {
      closeModal()
    }
  }

  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="widget-box widget-photos">
            {photos.length === 0 && (
              <Alert alertType="PRIMARY" message={noPhotos} style={{ width: '100%', textAlign: 'center' }} />
            )}
            {photos.length > 0 && (
              <>
                <InfiniteScroll dataLength={photos.length} next={getPhotosList} hasMore loader={LoaderDiv}>
                  <div className="grid grid-3-3-3-3 centered grid-photos" style={{ overflow: 'hidden' }}>
                    {photos.map((item) => {
                      return (
                        <div key={item.id} className="album-preview" onClick={() => handleImgIndex(item)}>
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
                          {!isMobile && (
                            <div className="album-preview-info" style={{ top: '-284px', borderRadius: '0' }}>
                            </div>
                          )}
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
                          if (currentItem.index + 4 >= photos.length) {
                            getPhotosList()
                          }
                        }}
                        onChange={(
                          currentPageIndex
                          )=> console.log(setItemId(photos[currentPageIndex.index].postId?? 0))}
                        className="class-up"
                      >
                        {photos.map((item) => {
                          return (
                            <ImagePop
                              key={item.id}
                              decoding="async"
                              src={item?.original}
                              alt={item.name}
                              onError={(e: any) => {
                                e.target.onerror = null
                                e.target.src = Utils.imgError
                              }}
                            />
                          )
                        })}
                      </Carousel>
                    </div>
                    <div className='containerLink'>
                      <a href={`/u/${provider.userName}/post/${itemId}`} className='goToPost'>Go to Post</a>
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

export default PhotoGalleryTab
