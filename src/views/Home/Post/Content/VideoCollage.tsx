import React, { FunctionComponent } from 'react'
import { SourceType } from '../../../../types/PostType.d'
import { videoUrl } from '../../../../utils/ResourceHelpers'

// const VideoCollage: FunctionComponent<{ source: SourceType[]}> = ()
const VideoCollage: FunctionComponent<{ sources: SourceType[] }> = (props) => {
  const { sources } = props

  return (
    <>
      {sources &&
        sources.map((video: any) => {
          return (
            <div key={`video-${video.id}`} style={{ marginTop: '20px' }}>
              <video title={video.name} controls width="100%">
                <track default kind="captions" />
                <source src={videoUrl(video.pathName)} type="video/webm" />
              </video>
            </div>
          )
        })}
    </>
  )
}

export default VideoCollage
