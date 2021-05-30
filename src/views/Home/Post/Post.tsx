import MessageModal from 'components/MessageModal/MessageModal'
import React, { FunctionComponent, useCallback, useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import ThreeDotsMenu from '../../../components/ThreeDotsMenu/ThreeDotsMenu'
import usePosts from '../../../hooks/usePosts'
import useUser from '../../../hooks/useUser'
import { PostType, SourceType } from '../../../types/PostType.d'
import BlockedSection from './BlockedSection/BlockedSection'
import LivePromotion from './Content/LivePromotion/LivePromotion'
import PictureCarousel from './Content/PictureCarousel'
import VideoCollage from './Content/VideoCollage'
import EditPost from './EditPost/EditPost'
import FooterPost from './Footer/FooterPost'
import HeaderPost from './Header/HeaderPost'

type PostProps = { data: PostType; isSinglePost?: boolean }

const Post: FunctionComponent<PostProps> = React.memo((props) => {
  const { data } = props

  const listImages: SourceType[] = data.images || []
  const listVideos: SourceType[] = data.videos || []

  const datePost = new Date(data.registerDate)

  const { deletePost } = usePosts()
  const { user } = useUser()

  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)

  const handleReturn = () => {
    if (listImages && listImages.length > 0) {
      return <PictureCarousel allData={data} />
    } else if (listVideos.length > 1 && listImages.length <= 0) {
      return <PictureCarousel allData={data} />
    } else if (listVideos && listVideos.length > 0 && listImages.length <= 0) {
      return <VideoCollage sources={listVideos} />
    }
  }

  const onDeletePost = useCallback(() => {
    deletePost(data.id).then(() => {
      window.location.reload()
    })
  }, [])

  return (
    <>
      <div className="widget-box no-padding" style={{ marginTop: '20px' }}>
        {user.id === data.users.id && (
          <>
            <ThreeDotsMenu>
              <div className="simple-dropdown widget-box-post-settings-dropdown">
                <Popup
                  modal
                  nested
                  contentStyle={{ width: '330px', borderRadius: '5px', minWidth: '' }}
                  position="center center"
                  trigger={<p className="simple-dropdown-link">Edit</p>}
                >
                  {(close: any) => <EditPost post={data} onClose={close} />}
                </Popup>

                <p
                  className="simple-dropdown-link"
                  onClick={() => {
                    setDeleteConfirmation(true)
                  }}
                >
                  Delete
                </p>
              </div>
            </ThreeDotsMenu>

            {deleteConfirmation && (
              <MessageModal
                message="Are you sure you want to delete your post?"
                onClose={(ok: boolean | undefined) => {
                  console.log('onClose View')
                  setDeleteConfirmation(false)

                  if (ok) {
                    onDeletePost()
                  }
                }}
              />
            )}
          </>
        )}

        <div className="widget-box-status">
          <div className="widget-box-status-content">
            <HeaderPost user={data.users || {}} datePost={datePost} />
            <p className="widget-box-status-text">{data.content}</p>
          </div>
          {handleReturn()}
          {/* <LivePromotion user={data.users} /> */}

          {/* TODO: Find out the correct way to validate a post blocked */}
          {data.blocked && (
            <>
              <BlockedSection post={data} />
            </>
          )}

          <div className="widget-box-status-content">
            {/* {data.tags && <TagList tags={data.tags || []} />} */}

            {data.postReactions && data.postReactions.length > 0 && (
              <div
                className="content-actions"
                style={{ flexDirection: 'row-reverse', marginTop: '10px', border: 'none', height: '30px' }}
              >
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
        {user.id !== data.users.id && <FooterPost user={data.users || {}} post={data} />}
      </div>
    </>
  )
})

export default Post
