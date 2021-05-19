import React, { FunctionComponent } from 'react'
import { SourceType } from '../../../../types/PostType.d'
import VideoPlayer from '../../../../assets/js/VideoPlayer';
import { isMobileOnly } from 'react-device-detect'
import * as Utils from '../../../../utils/Functions'


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
            <div key={Utils.simpleKeyGenerator(5)} data-vjs-player>
              <VideoPlayer src={video.accessUrl} type='' options={options} aspect={aspect} />
            </div>
          )
        })}
    </>
  )
})

export default VideoCollage
