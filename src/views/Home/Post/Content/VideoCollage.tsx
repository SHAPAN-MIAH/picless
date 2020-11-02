import React, { FunctionComponent } from 'react'
import { SourceType } from '../../../../types/PostType.d'
import { videoUrl } from '../../../../utils/ResourceHelpers'

// const VideoCollage: FunctionComponent<{ source: SourceType[]}> = ()
const VideoCollage: FunctionComponent<{ sources: any }> = (props) => {
  const { sources } = props

  return (
    <>
      {sources &&
        sources.map((video: any) => {
          return (
            <div key={`video-${video.id}`} className="iframe-wrap">
              <iframe title={video.name} src={videoUrl(video.path)} allowFullScreen />
            </div>
          )
        })}
    </>
  )
}

export default VideoCollage
