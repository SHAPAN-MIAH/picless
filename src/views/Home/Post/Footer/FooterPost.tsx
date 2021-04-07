import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Popup from 'reactjs-popup'
import usePost from '../../../../hooks/usePost'
import { PostType } from '../../../../types/PostType.d'
import { UserType } from '../../../../types/UserType.d'
import SendATip from '../../../UserProfile/Profile/Header/SendATip/SendATip'
import styles from './FooterPost.module.css'

type FooterPostProps = { user?: UserType; post: PostType }

const FooterPost: FunctionComponent<FooterPostProps> = React.memo((props) => {
  const { user, post } = props

  const [liked, setLiked] = useState<boolean>(false)

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

  const likedRef = useRef(-1)

  const { addReaction, removeReaction } = usePost()

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
      removeReaction(likedRef.current).then(() => {
        likedRef.current = -1
        setLiked(false)
      })
    }
  }, [])

  return (
    <>
      <div className="post-options">
        <div className="post-option-wrap">
          <div className="post-option" onClick={onLike}>
            <svg className={classNames('post-option-icon icon-thumbs-up', liked ? styles.liked : '')}>
              <use xlinkHref="#svg-thumbs-up" />
            </svg>
            {liked ? (
              <p className={classNames('post-option-text', styles.liked)}>Liked!</p>
            ) : (
              <p className="post-option-text">Like</p>
            )}
          </div>
        </div>

        {/* <div className="post-option">
          <svg className="post-option-icon icon-comment">
            <use xlinkHref="#svg-comment" />
          </svg>

          <p className="post-option-text">Comment</p>
        </div> */}

        <Popup
          modal
          contentStyle={{ width: '330px', borderRadius: '5px', minWidth: '' }}
          position="center center"
          trigger={
            <div className="post-option">
              <div className="post-option-icon">
                <FontAwesomeIcon color="#adafca" icon="dollar-sign" />
              </div>

              <p className="post-option-text">Send a tip</p>
            </div>
          }
        >
          {(close: any) => <SendATip user={user || {}} callback={handleCallback} onClose={close} />}
        </Popup>
      </div>
    </>
  )
})

export default FooterPost
