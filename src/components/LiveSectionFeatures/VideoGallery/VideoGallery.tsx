import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import Alert from '../../../components/Common/Alerts/Alerts'
import useProfile from '../../../hooks/useProfile'
import * as Utils from '../../../utils/Functions'
import { isMobile } from 'react-device-detect'
import VideoPlayer from '../../../assets/js/VideoPlayer'


import './VideoGallery.css'

const noVideos = 'Nothing to show'

const LoaderDiv = (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
        <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
    </div>
)

const VideoGallery: React.FunctionComponent<{}> = () => {
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
    return (
        <div>
            <div className="grid">
                <div className="grid-column">
                    <div className="widget-box widget-videos">
                        {videos.length === 0 && <Alert alertType="PRIMARY" message={noVideos} style={{ width: '100%', textAlign: 'center' }} />}
                        {videos.length > 0 && (
                            <>
                                <InfiniteScroll dataLength={videos.length} next={getVideoList} hasMore loader={LoaderDiv}>
                                    <div className="grid grid-3-3-3-3 centered grid-videos" style={{ overflow: 'hidden' }}>
                                        {videos.map((item) => {
                                            return (
                                                <div key={item.id} className="album-preview">
                                                    <div key={item.id} data-vjs-player>
                                                        <VideoPlayer src={item.accessUrl} type="" options={options} aspect='1:1' />
                                                    </div>
                                                    <div style={{ width: '100%', height: '100%' }}>
                                                        <img
                                                            src={Utils.imgError}
                                                            className='tumbail-video'
                                                            alt={item.name}
                                                            onError={(e: any) => {
                                                                e.target.onerror = null
                                                                e.target.src = Utils.imgError
                                                            }}
                                                        />
                                                    </div>
                                                    {!isMobile && (
                                                        <div className="album-preview-info" style={{ top: '-284px' }}>
                                                            <p className="album-preview-title">View post</p>
                                                            <p className="album-preview-text">{item.registerDate}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </InfiniteScroll>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGallery;