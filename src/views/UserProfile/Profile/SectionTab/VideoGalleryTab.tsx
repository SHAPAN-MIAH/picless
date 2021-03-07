import React, { FunctionComponent, useEffect, useState } from 'react'
import Alert from '../../../../components/Common/Alerts/Alerts'
import LiquidImage from '../../../../components/Common/LiquidImage'
import useProfile from '../../../../hooks/useProfile'

const noVideos = 'Nothing to show'

const VideoGalleryTab: FunctionComponent<{}> = () => {
  const { getVideos, videos, provider } = useProfile({ disableMount: true })
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    setLoading(true)
    if (provider && videos && videos.length === 0) {
      getVideos().then(() => {
        setLoading(false)

        if (window.tpl) {
          window.tpl.load(['dropdown', 'user-avatar'])
        }
      })
    } else setLoading(false)
  }, [])

  return (
    <>
      {!loading && (
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

                  {videos.map((item) => {
                    return (
                      <>
                        <div className="photos-masonry">
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
                        </div>
                      </>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoGalleryTab
