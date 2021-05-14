import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import ReactHlsPlayer from 'react-hls-player/dist'
import styled from 'styled-components'
import { SourceType } from '../../../../types/PostType.d'
import VideoPlayer from '../../../../assets/js/VideoPlayer';


const VideoComponent = styled(ReactHlsPlayer)`
  max-height: 670px;
`

const VideoContainer = styled.div`
max-height: 78vh;
  background-color: #212529;
`

const VideoCollage: FunctionComponent<{ sources: SourceType[]}> = React.memo((props) => {
  const { sources } = props
  
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
    <div data-vjs-player>
        <VideoPlayer src='https://s3-image-dev.s3-eu-west-1.amazonaws.com/hls/vide.m3u8' type='' options={options}  />
    </div>
    </>
  )
})

export default VideoCollage
