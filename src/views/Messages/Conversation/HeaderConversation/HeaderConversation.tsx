import React, { FunctionComponent, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loader-spinner'

import { loadingSelector } from '../../../../redux/Chat/ChatSelectors'
import { setUserSelected } from '../../../../redux/Chat/ChatThunks'

import UserAvatar from '../../../../components/UserAvatar'

import { UserStatusMessagesType } from '../../../../types/MessagesType.d'

type HeaderConversationProps = {
  user: UserStatusMessagesType
}

const HeaderConversation: FunctionComponent<HeaderConversationProps> = (props) => {
  const dispatch = useDispatch()
  const loading: boolean = useSelector(loadingSelector)

  const { user } = props

  const status = (user.connectionId !== null && user.connectionId) !== '' ? 'online' : 'offline'

  const reloadChats = useCallback(() => {
    dispatch(setUserSelected(user.userId))
  }, [dispatch, user.userId])

  return (
    <>
      <div className="user-status">
        <UserAvatar
          key={`avatar-${user.userId}`}
          image={process.env.REACT_APP_BUCKET_IMAGES + user.avatarPicture}
          size="SMALL"
        />
        <div className="chat-widget-settings">
          {loading && <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />}
          {!loading && (
            <div onClick={reloadChats} title="Reload">
              <FontAwesomeIcon color="#8f91ac" icon="redo" />
            </div>
          )}
        </div>
        <p className="user-status-title">
          <span className="bold">{user.fullName}</span>
        </p>

        <p className={`user-status-tag ${status}`}>{status}</p>
      </div>
    </>
  )
}

export default HeaderConversation
