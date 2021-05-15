import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Alert from '../../../../components/Common/Alerts/Alerts'
import useProfile from '../../../../hooks/useProfile'
import { isMobile } from 'react-device-detect'

import './PhotoGalleryTabs.css'

const noPhotos = 'Nothing to show'

const ContainerLink = styled(Link)`
  height: 284px !important;
`

const ImageContainerDiv = styled.div`
  width: 100%;
  height: 100%;
`

const ImageImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const PhotoGalleryTab: FunctionComponent<{}> = () => {
  const { getPhotos, photos, provider } = useProfile({ disableMount: true })

  const [page, setPage] = useState<number>(0)

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
                  <div className="grid grid-3-3-3-3 centered grid-photos">
                    {photos.map((item) => {
                      return (
                        <>
                          <ContainerLink
                            key={item.id}
                            to={`/u/${provider.userName}/post/${item.postId}`}
                            className="album-preview"
                          >
                            <ImageContainerDiv>
                              <ImageImg src={item.thumbnail} alt={item.name} />
                            </ImageContainerDiv>
                            {!isMobile &&
                              <div className="album-preview-info" style={{ top: '-284px' }}>
                                <p className="album-preview-title">View post</p>

                                <p className="album-preview-text">{item.registerDate}</p>
                              </div>
                            }
                          </ContainerLink>
                        </>
                      )
                    })}
                  </div>
                </InfiniteScroll>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PhotoGalleryTab
