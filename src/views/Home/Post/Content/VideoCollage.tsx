import React, { FunctionComponent } from 'react'
import ReactHlsPlayer from 'react-hls-player/dist'
import styled from 'styled-components'
import { SourceType } from '../../../../types/PostType.d'
import VideoPlayer from '../../../../assets/js/VideoPlayer';
import { isMobileOnly } from 'react-device-detect'

const VideoComponent = styled(ReactHlsPlayer)`
  max-height: 670px;
`

const VideoContainer = styled.div`
max-height: 78vh;
  background-color: #212529;
`


const VideoCollage: FunctionComponent<{ sources: SourceType[]}> = React.memo((props) => {
  const { sources } = props
  
  const aspect = isMobileOnly ? '4:5' : '4:3'; 
  const options = {
    fill: true,
    fluid: true,
    responsive: true,
    preload: 'auto',
    controls: true,
    controlBar: { 
      'pictureInPictureToggle': false
     },
  }
  return (
    <>
     {sources &&
        sources.map((video: any) => {
          return (
            <div data-vjs-player>
              <VideoPlayer src={video.accessUrl} type='' options={options} aspect={aspect} />
            </div>
          )
        })}
    </>
  )
})

export default VideoCollage
