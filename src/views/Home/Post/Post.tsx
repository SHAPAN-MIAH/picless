import React, { FunctionComponent } from 'react'

import FooterPost from './Footer/FooterPost'
import HeaderPost from './Header/HeaderPost'
import TagList from './Footer/TagList'
// import PictureCollage from './Content/PictureCollage'

import { PostType, SourceType } from '../../../types/PostType.d'
import VideoCollage from './Content/VideoCollage'
import PictureCarousel from './Content/PictureCarousel'

const Post: FunctionComponent<{ data: PostType }> = (props) => {
  const { data } = props

  const listImages: SourceType[] = data.images || []
  const listVideos: SourceType[] = data.videos || []

  const datePost = new Date(data.registerDate)

  return (
    <>
      <div className="widget-box no-padding">
        <div className="widget-box-status">
          <div className="widget-box-status-content">
            <HeaderPost user={data.users || {}} datePost={datePost} />
            <p className="widget-box-status-text">{data.content}</p>
          </div>

          {listImages && listImages.length > 0 && <PictureCarousel sources={listImages} />}
          {listVideos && listVideos.length > 0 && <VideoCollage sources={listVideos} />}

          <div className="widget-box-status-content" style={{ marginBottom: '25px' }}>
            {data.tags && <TagList tags={data.tags || []} />}

            {/* <div className="content-actions" style={{ flexDirection: 'row-reverse' }}>
              <div className="content-action">
                <div className="meta-line">
                  <p className="meta-line-link">2 Comments</p>
                </div>
              </div> 
            </div> */}
          </div>
        </div>

        <FooterPost user={data.users || {}} />
      </div>
    </>
  )
}

export default Post
