import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { SourceType } from '../../../../types/PostType.d'
import { videoUrl } from '../../../../utils/ResourceHelpers'

const VideoComponent = styled.video`
  max-height: 670px;
`

const VideoContainer = styled.div`
  margin-top: 20px;
  background-color: #212529;
`

const VideoCollage: FunctionComponent<{ sources: SourceType[] }> = React.memo((props) => {
  const { sources } = props

  return (
    <>
      {sources &&
        sources.map((video: any) => {
          return (
            <VideoContainer key={`video-${video.id}`}>
              <VideoComponent title={video.name} controls width="100%">
                <track default kind="captions" />
                <source src={videoUrl(video.pathName)} type="video/webm" />
              </VideoComponent>
            </VideoContainer>
          )
        })}
    </>
  )
})

export default VideoCollage
