import React, { FunctionComponent, useCallback } from 'react'
import { dateToUnixTimestamp } from 'utils/Helpers'
import ThreeDotsMenu from '../../../components/ThreeDotsMenu/ThreeDotsMenu'
import usePost from '../../../hooks/usePost'
import useUser from '../../../hooks/useUser'
import { PostType, SourceType } from '../../../types/PostType.d'
import PictureCarousel from './Content/PictureCarousel'
import VideoCollage from './Content/VideoCollage'
import EditPost from './EditPost/EditPost'
import FooterPost from './Footer/FooterPost'
import HeaderPost from './Header/HeaderPost'

type PostProps = { data: PostType; isSinglePost?: boolean }

const Post: FunctionComponent<PostProps> = React.memo((props) => {
  const { data, isSinglePost = false } = props

  const listImages: SourceType[] = data.images || []
  const listVideos: SourceType[] = data.videos || []

  const datePost = new Date(data.registerDate)

  const { deletePost } = usePost()
  const { user } = useUser()

  const onDeletePost = useCallback((postId: number) => {
    deletePost(postId)
  }, [])

  return (
    <>
      <div className="widget-box no-padding" style={{ marginTop: '20px' }}>
        {user.id === data.users.id && (
          <ThreeDotsMenu>
            <div className="simple-dropdown widget-box-post-settings-dropdown">
              <EditPost />
              <p
                className="simple-dropdown-link"
                onClick={() => {
                  onDeletePost(data.id)
                }}
              >
                Delete
              </p>
            </div>
          </ThreeDotsMenu>
        )}

        <div className="widget-box-status">
          <div className="widget-box-status-content">
            <HeaderPost user={data.users || {}} datePost={datePost} />
            <p className="widget-box-status-text">{data.content}</p>
          </div>
          {listImages && listImages.length > 0 && <PictureCarousel sources={listImages} />}
          {listVideos && listVideos.length > 0 && <VideoCollage sources={listVideos} />}

          <div className="widget-box-status-content">
            {/* {data.tags && <TagList tags={data.tags || []} />} */}

            {data.postReactions && data.postReactions.length > 0 && (
              <div className="content-actions" style={{ flexDirection: 'row-reverse' }}>
                <div className="content-action">
                  <div className="meta-line">
                    {data.postReactions[0].quantity && data.postReactions[0].quantity > 1 ? (
                      <p className="meta-line-link">{data.postReactions[0].quantity} Likes</p>
                    ) : (
                      <p className="meta-line-link">{data.postReactions[0].quantity} Like</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <FooterPost user={data.users || {}} post={data} />
      </div>
    </>
  )
})

export default Post
