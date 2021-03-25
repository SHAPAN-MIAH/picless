import ThreeDotsMenu from 'components/ThreeDotsMenu/ThreeDotsMenu'
import React, { FunctionComponent } from 'react'
import { PostType, SourceType } from '../../../types/PostType.d'
import PictureCarousel from './Content/PictureCarousel'
import VideoCollage from './Content/VideoCollage'
import FooterPost from './Footer/FooterPost'
import HeaderPost from './Header/HeaderPost'

type PostProps = { data: PostType; isSinglePost?: boolean }

const HeaderOptions = () => (
  <div className="post-settings widget-box-post-settings-dropdown-trigger">
    <svg className="post-settings-icon icon-more-dots">
      <use xlinkHref="#svg-more-dots" />
    </svg>
  </div>
)

const Post: FunctionComponent<PostProps> = React.memo((props) => {
  const { data, isSinglePost = false } = props

  const listImages: SourceType[] = data.images || []
  const listVideos: SourceType[] = data.videos || []

  const datePost = new Date(data.registerDate)

  return (
    <>
      <div className="widget-box no-padding" style={{ marginTop: '20px' }}>
        <ThreeDotsMenu>
          <div className="simple-dropdown widget-box-post-settings-dropdown">
            <p className="simple-dropdown-link">Delete</p>
          </div>
        </ThreeDotsMenu>

        <div className="widget-box-status">
          <div className="widget-box-status-content">
            <HeaderPost user={data.users || {}} datePost={datePost} />
            <p className="widget-box-status-text">{data.content}</p>
          </div>

          {listImages && listImages.length > 0 && <PictureCarousel sources={listImages} />}
          {listVideos && listVideos.length > 0 && <VideoCollage sources={listVideos} />}

          <div className="widget-box-status-content" style={{ marginBottom: '25px' }}>
            {/* {data.tags && <TagList tags={data.tags || []} />} */}

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
})

export default Post
