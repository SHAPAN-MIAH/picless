import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Popup from 'reactjs-popup'
import usePosts from '../../../../hooks/usePosts'
import { PostType } from '../../../../types/PostType.d'
import { UserType } from '../../../../types/UserType'
import SendATip from '../../../UserProfile/Profile/Header/SendATip/SendATip'
import styles from './FooterPost.module.css'
import SendPrivateMessage from './SendPrivateMessage/SendPrivateMessage'

type FooterPostProps = { user?: UserType; post: PostType }

const FooterPost: FunctionComponent<FooterPostProps> = React.memo((props) => {
  const { user, post } = props

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
            <svg 
              className={classNames('post-option-icon icon-thumbs-up icon-like', liked ? styles.liked : '')}
              viewBox="0 0 17 17"
              style={{ fontWeight: 'bolder'}}
            >
              <path
                d="M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z"
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
          contentStyle={{ width: '330px', borderRadius: '5px', minWidth: ''}}
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
                <path
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-8.8c-1.17-.24-2.06-.33-2.06-.87s.47-.57 1.17-.57a1.36 1.36 0 0 1 1 .48.53.53 0 0 0 .39.18H15a.24.24 0 0 0 .23-.25c0-.78-1-1.72-2.23-2V7.3a.29.29 0 0 0-.3-.3h-1.4a.29.29 0 0 0-.29.3v.82a2.57 2.57 0 0 0-2.2 2.26c0 3.13 4.52 2.07 4.52 3.22 0 .53-.52.59-1.41.59a1.47 1.47 0 0 1-1.16-.57.61.61 0 0 0-.44-.19h-1.4a.24.24 0 0 0-.22.24c0 1.11 1.12 1.9 2.31 2.21v.82a.29.29 0 0 0 .29.3h1.39a.29.29 0 0 0 .29-.3v-.78c1.28-.23 2.32-1 2.32-2.33s-.92-2.09-2.3-2.39z"
                />
              </svg>
              <p className="post-option-text">Send tip</p>
            </div>
          }
        >
          {(close: any) => <SendATip user={user || {}} callback={handleCallback} onClose={close} />}
        </Popup>
        <div className="post-option-wrap">
          <div className="post-option" onClick={hanleSaved} style={{width: '100px'}}>
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
})

export default FooterPost
