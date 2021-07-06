import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import usePosts from '../../../../hooks/usePosts'

import SendPrivateMessage from '../../../SendPrivateMessage/SendPrivateMessage'
import SendATip from '../../../SendATip/SendATip'

import { PostType } from 'types/PostType'

import styles from './Footer.module.css'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

type FooterProps = {
  post: PostType
}

const Footer: FunctionComponent<FooterProps> = (props) => {
  const { post } = props
  const { users: user } = post

  const [liked, setLiked] = useState<boolean>(false)
  const [save, setSaved] = useState<boolean>(false)
  const likedRef = useRef(-1)

  const { addReaction, removeReaction, savePost } = usePosts()

  useEffect(() => {
    const { postReactions, saved } = post
    if (postReactions) {
      if (postReactions.length > 0) {
        if (postReactions[0].id) {
          likedRef.current = postReactions[0].id
          setLiked(true)
        }
      }
    }

    if (saved) setSaved(true)
  }, [])

  const handleCallback = (status: string, message?: string) => {
    if (status === 'SUCCESS') {
      toast.success(`Tip sended, ${user?.userName} is grateful`)
    } else if (status === 'ERROR') {
      toast.error(message || 'Unknown error')
    }
  }

  const onLike = useCallback(() => {
    if (likedRef.current < 0) {
      addReaction(post.id).then((reactionId: number) => {
        likedRef.current = reactionId
        setLiked(true)
      })
    } else {
      removeReaction(post.id, 'LIKE', likedRef.current).then(() => {
        likedRef.current = -1
        setLiked(false)
      })
    }
  }, [])

  const handleSaved = () => {
    const action: 'ADD' | 'REMOVE' = save ? 'REMOVE' : 'ADD'

    savePost(post.id, action).then(() => {
      setSaved(!save)
    })
  }

  return (
    <>
      <div className="post-options">
        <div className="post-option-wrap">
          <div className="post-option" onClick={onLike}>
            {liked ? (
              <div className={classNames('post-option-icon', liked ? styles.liked : '')} style={{ marginTop: '-7px' }}>
                <FontAwesomeIcon icon="heart" color={!liked ? '' : 'red'} viewBox="0 0 400 400" />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classNames('post-option-icon', liked ? styles.liked : '')}
                width={25}
                height={25}
                viewBox="0 0 20 20"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            )}
            {liked ? (
              <p className={classNames('post-option-text', styles.liked)}>Liked!</p>
            ) : (
              <p className="post-option-text">Like</p>
            )}
          </div>
        </div>
        <Popup
          modal
          contentStyle={{ width: '330px', borderRadius: '5px', minWidth: '' }}
          position="center center"
          trigger={
            <div className="post-option">
              <svg className="post-option-icon icon-comment">
                <use xlinkHref="#svg-comment" />
              </svg>

              <p className="post-option-text">Message</p>
            </div>
          }
        >
          {(close: any) => <SendPrivateMessage post={post || {}} onClose={close} />}
        </Popup>

        <Popup
          modal
          contentStyle={{ width: '330px', borderRadius: '5px', minWidth: '' }}
          position="center center"
          trigger={
            <div className="post-option">
              <svg className="post-option-icon icon-thumbs-up'" width={25} height={25} viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-8.8c-1.17-.24-2.06-.33-2.06-.87s.47-.57 1.17-.57a1.36 1.36 0 0 1 1 .48.53.53 0 0 0 .39.18H15a.24.24 0 0 0 .23-.25c0-.78-1-1.72-2.23-2V7.3a.29.29 0 0 0-.3-.3h-1.4a.29.29 0 0 0-.29.3v.82a2.57 2.57 0 0 0-2.2 2.26c0 3.13 4.52 2.07 4.52 3.22 0 .53-.52.59-1.41.59a1.47 1.47 0 0 1-1.16-.57.61.61 0 0 0-.44-.19h-1.4a.24.24 0 0 0-.22.24c0 1.11 1.12 1.9 2.31 2.21v.82a.29.29 0 0 0 .29.3h1.39a.29.29 0 0 0 .29-.3v-.78c1.28-.23 2.32-1 2.32-2.33s-.92-2.09-2.3-2.39z" />
              </svg>
              <p className="post-option-text">Send tip</p>
            </div>
          }
        >
          {(close: any) => <SendATip user={user || {}} callback={handleCallback} onClose={close} />}
        </Popup>

        <div className="post-option-wrap">
          <div className="post-option" onClick={handleSaved} style={{ width: '100px' }}>
            {save ? (
              <div style={{ display: 'flex' }}>
                <FontAwesomeIcon style={{ marginTop: '2px', marginRight: "7px", color: "#23d2e2", fontSize: "20px" }} icon={faBookmark} className={styles.timesIcon} />

                <p style={{ marginTop: "6px", marginLeft: "6px" }} className={classNames('post-option-text', styles.liked)}>Saved!</p>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                <svg style={{ marginTop: "2px" }} className={classNames('post-option-icon icon-thumbs-up', save ? styles.liked : '')}>
                  <use xlinkHref="#svg-pinned" />
                </svg>
                <p style={{ marginTop: "5px" }} className="post-option-text">Save</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const arePropsEqual = (prev: any, next: any) => {
  return true
}

export default React.memo(Footer, arePropsEqual)
