import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import Alert from '../../../../components/Common/Alerts/Alerts'
import useProfile from '../../../../hooks/useProfile'

const noPhotos = 'Nothing to show'

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
  const [loading, setLoading] = useState<boolean>()
  const [page, setPage] = useState<number>(0)

  const getPhotosList = useCallback(() => {
    getPhotos(page).then(() => {
      setLoading(false)
      setPage(page + 1)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    if (provider && photos && photos.length === 0) {
      getPhotosList()
      if (window.tpl) {
        window.tpl.load(['dropdown'])
      }
    } else setLoading(false)
  }, [getPhotosList])

  if (loading) {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
          <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="widget-box">
            {photos.length === 0 && (
              <Alert alertType="PRIMARY" message={noPhotos} style={{ width: '100%', textAlign: 'center' }} />
            )}
            {photos.length > 0 && (
              <>
                <div className="section-header-info">
                  <p className="section-pretitle">Check {provider.firstName || provider.fullName}</p>

                  <h2 className="section-title">Photos</h2>
                </div>

                <InfiniteScroll dataLength={photos.length} next={getPhotosList} hasMore loader={LoaderDiv}>
                  <div className="photos-masonry">
                    {photos.map((item) => {
                      return (
                        <>
                          <div className="photo-preview ">
                            <ImageContainerDiv>
                              <ImageImg src={item.thumbnail} alt={item.name} />
                            </ImageContainerDiv>
                            <div className="photo-preview-info" style={{ marginTop: '-184px' }}>
                              <div className="reaction-count-list landscape">
                                <div className="reaction-count negative">
                                  <svg className="reaction-count-icon icon-comment">
                                    <use xlinkHref="#svg-comment" />
                                  </svg>

                                  <p className="reaction-count-text">View post</p>
                                </div>
                              </div>
                            </div>
                          </div>
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
