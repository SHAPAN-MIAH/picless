import MessageModal from 'components/MessageModal/MessageModal'
import React, { FunctionComponent, useCallback, useState } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import ThreeDotsMenu from '../../ThreeDotsMenu/ThreeDotsMenu'
import usePosts, { ReportTypes } from '../../../hooks/usePosts'
import useUser from '../../../hooks/useUser'
import { PostType } from '../../../types/PostType'

import EditPost from '../EditPost/EditPost'
import Header from './Header/Header'
import Content from './Content/Content'
import Locked from './Content/Locked/Locked'
import Footer from './Footer/Footer'

type PostProps = { data: PostType; isSinglePost?: boolean }

const Post: FunctionComponent<PostProps> = React.memo((props) => {
  const { data } = props

  const { deletePost, reportPost } = usePosts()
  const { user } = useUser()

  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false)
  const [reportInappropriateConfirmation, setReportInappropriateConfirmation] = useState<boolean>(false)
  const [reportSpamConfirmation, setReportSpamConfirmation] = useState<boolean>(false)

  const onDeletePost = useCallback(() => {
    deletePost(data.id).then(() => {
      window.location.reload()
    })
  }, [])

  const onReportPost = useCallback((code: ReportTypes) => {
    reportPost(data.id, code)
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
                  setDeleteConfirmation(false)

                  if (ok) {
                    onDeletePost()
                  }
                }}
              />
            )}
          </>
        )}

        {user.id !== data.users.id && (
          <>
            <ThreeDotsMenu>
              <div className="simple-dropdown widget-box-post-settings-dropdown" style={{ width: '160px' }}>
                <p
                  className="simple-dropdown-link"
                  onClick={() => {
                    setReportInappropriateConfirmation(true)
                  }}
                >
                  Report as Inappropriate
                </p>
                <p
                  className="simple-dropdown-link"
                  onClick={() => {
                    setReportSpamConfirmation(true)
                  }}
                >
                  Report as Spam
                </p>
              </div>
            </ThreeDotsMenu>

            {reportInappropriateConfirmation && (
              <MessageModal
                message="Are you sure you want to report as inappropriate?"
                onClose={(ok: boolean | undefined) => {
                  setReportInappropriateConfirmation(false)

                  if (ok) {
                    onReportPost(ReportTypes.INAPPROPRIATE)
                  }
                }}
              />
            )}

            {reportSpamConfirmation && (
              <MessageModal
                message="Are you sure you want to report as spam?"
                onClose={(ok: boolean | undefined) => {
                  setReportSpamConfirmation(false)

                  if (ok) {
                    onReportPost(ReportTypes.SPAM)
                  }
                }}
              />
            )}
          </>
        )}

        <div className="widget-box-status">
          <div className="widget-box-status-content">
            <Header post={data} />
            <p className="widget-box-status-text" style={{ margin: '10px 0' }}>
              {data.content}
            </p>
          </div>
          <Content post={data} />
          {/* <LivePromotion user={data.users} /> */}

          {/* TODO: Find out the correct way to validate a post blocked */}
          {data.blocked && (
            <>
              <Locked post={data} />
            </>
          )}

          <div className="widget-box-status-content">
            {/* {data.tags && <TagList tags={data.tags || []} />} */}

            {data.postReactions && data.postReactions.length > 0 && (
              <div
                className="content-actions"
                style={{ flexDirection: 'row-reverse', marginTop: '0px', border: 'none', height: '20px' }}
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
        {user.id !== data.users.id && <Footer post={data} />}
      </div>
    </>
  )
})

export default Post
