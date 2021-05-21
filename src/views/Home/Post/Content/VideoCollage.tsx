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


  
  const width = 525;
  const height = 657


  const maximoComunDivisor = (width:number, height:number): any => {
    if (height === 0) return width;
    return maximoComunDivisor(height, width % height);
  };

  const base = maximoComunDivisor(width, height);
  const numerator = Math.round(width/base);
  const denominator = Math.round(height/base);
  const appearance = `${numerator}:${denominator}` != 'NaN:NaN' ? `${numerator}:${denominator}` : '4:5';


  return (
    <>
     {sources &&
        sources.map((video: any) => {
          let url = video.accessUrl
          switch(video.id) {
            case 29:
              url = 'https://video-new.lup20.uk/gray/video.m3u8'
            break;
            case 30:
              url = 'https://video-new.lup20.uk/black/video.m3u8'
            break;
            case 31:
              url = 'https://video-new.lup20.uk/color/video.m3u8'
            break;
            case 32:
              url = 'https://video-new.lup20.uk/color-transparent/video.m3u8'
            break;
            case 33:
              url = 'https://video-new.lup20.uk/white/video.m3u8'
            break;
            case 34:
              url = 'https://video-new.lup20.uk/color-white/video.m3u8'
            break;
            case 35:
              url = 'https://video-new.lup20.uk/gray-white/video.m3u8'
            break;
          }
          return (
            <div key={Utils.simpleKeyGenerator(5)} data-vjs-player>
              <VideoPlayer src={url} type='' options={options} aspect={appearance} />
            </div>
          )
        })}
    </>
  )
})

export default VideoCollage
