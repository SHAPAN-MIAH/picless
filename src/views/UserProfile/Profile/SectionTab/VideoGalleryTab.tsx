import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import Alert from '../../../../components/Common/Alerts/Alerts'
import LiquidImage from '../../../../components/Common/LiquidImage'
import useProfile from '../../../../hooks/useProfile'

const noVideos = 'Nothing to show'

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const VideoGalleryTab: FunctionComponent<{}> = () => {
  const { getVideos, videos, provider } = useProfile({ disableMount: true })
  const [page, setPage] = useState<number>(0)

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
  }, [getVideoList])

  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="widget-box">
            {videos.length === 0 && <Alert alertType="PRIMARY" message={noVideos} style={{ width: '100%' }} />}
            {videos.length > 0 && (
              <>
                <div className="section-header-info">
                  <p className="section-pretitle">Check {provider.firstName || provider.fullName}</p>

                  <h2 className="section-title">Videos</h2>
                </div>

                <InfiniteScroll dataLength={videos.length} next={getVideoList} hasMore loader={LoaderDiv}>
                  <div className="photos-masonry">
                    {videos.map((item) => {
                      return (
                        <>
                          <div className="photo-preview popup-picture-trigger">
                            <LiquidImage
                              className="user-preview-cover"
                              src={`${process.env.PUBLIC_URL}/img/cover/06.jpg`}
                              alt="cover-04"
                            />

                            <div className="photo-preview-info">
                              <div className="reaction-count-list landscape">
                                <div className="reaction-count negative">
                                  <svg className="reaction-count-icon icon-comment">
                                    <use xlinkHref="#svg-comment" />
                                  </svg>

                                  <p className="reaction-count-text">View post {item.name}</p>
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

export default VideoGalleryTab
