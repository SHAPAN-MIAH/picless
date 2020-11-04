import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

import UserAvatar from '../../../components/UserAvatar'

interface UserStatusProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  active: boolean
  lastMessage?: string
  lastConnection?: Date
}

const UserStatus: FunctionComponent<UserStatusProps> = (props) => {
  const { active, lastMessage, lastConnection } = props

  return (
    <>
      <div className={classNames('chat-widget-message', active ? 'active' : '')}>
        <div className="user-status">
          <UserAvatar image={`${process.env.PUBLIC_URL}/assets/img/avatar/04.jpg`} />

          <p className="user-status-title" style={{ margin: '0px' }}>
            <span className="bold">Bearded Wonder</span>
          </p>

          <p className="user-status-text">{lastMessage?.slice(0, 45)}...</p>

          <p className="user-status-timestamp floaty">2 hours ago</p>
        </div>
      </div>
    </>
  )
}

export default UserStatus
