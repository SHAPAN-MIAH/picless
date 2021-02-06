import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type LiveViewProps = {
  videoRef: React.RefObject<HTMLVideoElement>
  playVideo: () => void
}

const LiveView: FunctionComponent<LiveViewProps> = (props) => {
  const { videoRef, playVideo } = props

  const handlePlay = () => {
    playVideo()
  }

  return (
    <>
      <div style={{ width: '100%', backgroundColor: 'rgba(21, 21, 31, 1)' }}>
        <video
          id="remoteVideo"
          ref={videoRef}
          controls
          playsInline
          autoPlay
          style={{ width: 'inherit', position: 'relative', zIndex: 0, maxHeight: '615px' }}
        />
        {/* Use it if is not autoplayable */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', display: 'none' }} onClick={handlePlay}>
          <FontAwesomeIcon icon="play-circle" color="white" size="10x" />
        </div>
      </div>
    </>
  )
}

export default LiveView
