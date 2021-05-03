import React, { FunctionComponent } from 'react'
import ReactHlsPlayer from 'react-hls-player/dist'
import styled from 'styled-components'
import { SourceType } from '../../../../types/PostType.d'

const VideoComponent = styled(ReactHlsPlayer)`
  max-height: 670px;
`

const VideoContainer = styled.div`
  margin-top: 20px;
  background-color: #212529;
`

const VideoCollage: FunctionComponent<{ sources: SourceType[] }> = React.memo((props) => {
  const { sources } = props
  const playerRef = React.useRef(null)

  return (
    <>
      {sources &&
        sources.map((video: any) => {
          return (
            <VideoContainer key={`video-${video.id}`}>
              <VideoComponent playerRef={playerRef} src={video.accessUrl} autoPlay={false} controls />
            </VideoContainer>
          )
        })}
    </>
  )
})

export default VideoCollage
