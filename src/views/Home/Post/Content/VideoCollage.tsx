import React, { FunctionComponent, useEffect, useState, useRef } from 'react'
import ReactHlsPlayer from 'react-hls-player/dist'
import styled from 'styled-components'
import { SourceType } from '../../../../types/PostType.d'
import Videojs from './TestVideo.js';

const VideoComponent = styled(ReactHlsPlayer)`
  max-height: 670px;
`

const VideoContainer = styled.div`
  margin-top: 20px;
  background-color: #212529;
`

const VideoCollage: FunctionComponent<{ sources: SourceType[]}> = React.memo((props) => {
  const { sources } = props
  
  const videoJsOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    breakpoints: {
      tiny: 300,
      xsmall: 400,
      small: 500,
      medium: 600,
      large: 700,
      xlarge: 800,
      huge: 900
    },
    width: 720,
    height: 300,
    controls: true,
    sources: [
      {
        src: 'https://d7lq2ylpfehd.cloudfront.net/5a7cbdd9-14a0-45a2-84a2-5d37a7fa1a5a_20210505_120500/hls/5a7cbdd9-14a0-45a2-84a2-5d37a7fa1a5a_20210505_120500.m3u8',
      },
    ],
  };
  
  return (
    <>
      <div>
        <Videojs {...videoJsOptions} />
      </div>;
    </>
  )
})

export default VideoCollage
