import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import Popup from 'reactjs-popup'

import usePosts from '../../../../hooks/usePosts'

import SendPrivateMessage from '../../../SendPrivateMessage/SendPrivateMessage'
import SendATip from '../../../SendATip/SendATip'

import { PostType } from 'types/PostType'

import styles from './Footer.module.css'

type FooterProps = {
  post: PostType
}

const Footer: FunctionComponent<FooterProps> = (props) => {
  const { post } = props
  const { users: user } = post

  const [liked, setLiked] = useState<boolean>(false)
  const [save, setsaved] = useState<boolean>(false)
  const likedRef = useRef(-1)

  const { addReaction, removeReaction } = usePosts()

  useEffect(() => {
    const { postReactions } = post
    if (postReactions) {
      if (postReactions.length > 0) {
        if (postReactions[0].id) {
          likedRef.current = postReactions[0].id
          setLiked(true)
        }
      }
    }
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

  const hanleSaved = () => {
    setsaved(!save)
  }

  return (
    <>
      <div className="post-options">
        <div className="post-option-wrap">
          <div className="post-option" onClick={onLike}>
            {/*<svg 
              className={classNames('post-option-icon icon-thumbs-up', liked ? styles.liked : '')}
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              viewBox="0 0 16 16"
              stroke-width=".25em"
              >
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
            />
            </svg>*/}
            <svg 
              className={classNames('post-option-icon icon-thumbs-up', liked ? styles.liked : '')}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              >
            <path d="M20.388,10.918L32,12.118l-8.735,7.749L25.914, 31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0, 12.118l11.547-1.2L16.026,0.6L20.388,10.918z"
            />
            </svg>
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
          <div className="post-option" onClick={hanleSaved} style={{ width: '100px' }}>
            <svg className={classNames('post-option-icon icon-thumbs-up', save ? styles.liked : '')}>
              <use xlinkHref="#svg-pinned" />
            </svg>
            {save ? (
              <p className={classNames('post-option-text', styles.liked)}>Saved!</p>
            ) : (
              <p className="post-option-text">Save</p>
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
