import React, { FunctionComponent } from 'react'
import { PostType, SourceType } from 'types/PostType'
import PictureCarousel from './PictureCarousel/PictureCarousel'
import VideoCollage from './VideoCollage/VideoCollage'

type ContentProps = {
  post: PostType
}

const Content: FunctionComponent<ContentProps> = (props) => {
  const { post } = props

  const listImages: SourceType[] = post.images || []
  const listVideos: SourceType[] = post.videos || []

  const handleReturn = () => {
    if (listImages && listImages.length > 0) {
      return <PictureCarousel allData={post} />
    } else if (listVideos.length > 1 && listImages.length <= 0) {
      return <PictureCarousel allData={post} />
    } else if (listVideos && listVideos.length > 0 && listImages.length <= 0) {
      return <VideoCollage sources={listVideos} />
    }
  }

  return <>{handleReturn()}</>
}

export default React.memo(Content)
