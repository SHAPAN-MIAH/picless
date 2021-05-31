import React, { FunctionComponent } from 'react'
import { isMobileOnly } from 'react-device-detect'

import VideoPlayer from '../../../../../assets/js/VideoPlayer'

import { SourceType } from '../../../../../types/PostType.d'

type VideoCollageProps = { sources: SourceType[] }

const VideoCollage: FunctionComponent<VideoCollageProps> = (props) => {
  const { sources } = props

  // const aspect = isMobileOnly ? '4:5' : '4:3'
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

  const width = 525
  const height = 657

  const maximoComunDivisor = (width: number, height: number): any => {
    if (height === 0) return width
    return maximoComunDivisor(height, width % height)
  }

  const base = maximoComunDivisor(width, height)
  const numerator = Math.round(width / base)
  const denominator = Math.round(height / base)
  const appearance = `${numerator}:${denominator}` != 'NaN:NaN' ? `${numerator}:${denominator}` : '4:5'

  return (
    <>
      {sources &&
        sources.map((video: SourceType) => {
          return (
            <div key={video.id} data-vjs-player>
              <VideoPlayer src={video.accessUrl} type="" options={options} aspect={appearance} />
            </div>
          )
        })}
    </>
  )
}

export default React.memo(VideoCollage)
