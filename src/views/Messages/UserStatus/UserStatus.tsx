import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import moment from 'moment'

import UserAvatar from '../../../components/UserAvatar'
import { UserStatusMessagesType } from '../../../types/MessagesType'

interface UserStatusProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  statusData: UserStatusMessagesType
  active: boolean
  onSelected: (userId: number) => void
}

const UserStatus: FunctionComponent<UserStatusProps> = (props) => {
  const { statusData, active = false, onSelected } = props

  return (
    <>
      <div
        className={classNames('chat-widget-message', active ? 'active' : '')}
        onClick={() => onSelected(statusData.userId)}
        aria-hidden="true"
        style={{ borderBottom: '1px solid #eaeaf5' }}
      >
        <div className="user-status">
          <UserAvatar imageName={statusData.avatarPicture} />

          <p className="user-status-title" style={{ margin: '0px' }}>
            <span className="bold">{statusData.fullName}</span>
          </p>

          <p className="user-status-text">{statusData.lastMessage?.slice(0, 45)}...</p>

          <p className="user-status-timestamp floaty">{moment(statusData.lastMessageDate).fromNow()}</p>
        </div>
      </div>
    </>
  )
}

export default UserStatus
