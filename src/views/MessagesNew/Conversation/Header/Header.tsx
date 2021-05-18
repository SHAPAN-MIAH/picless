import React, { FunctionComponent, useEffect } from 'react'
import { UserStatusMessagesType } from 'types/MessagesType'
import UserAvatar from 'components/UserAvatar'
import Loader from 'react-loader-spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useChatMessages from 'hooks/useChatMessages'

type HeaderProps = {
  user: UserStatusMessagesType
  loading: boolean
}

const Header: FunctionComponent<HeaderProps> = (props) => {
  const { user, loading } = props
  const { getMessageHistory } = useChatMessages()

  const status = user.connectionId ? 'online' : 'offline'

  return (
    <>
      <div className="user-status">
        <UserAvatar key={`avatar-${user.userId}`} imageName={user.avatarPicture} size="S" />
        <div className="chat-widget-settings">
          {loading && <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />}
          {!loading && (
            <div
              onClick={() => {
                getMessageHistory(user.userId)
              }}
              title="Reload"
              style={{ cursor: 'pointer' }}
            >
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

export default Header
