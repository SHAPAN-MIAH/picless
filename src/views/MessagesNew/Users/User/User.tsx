import React, { FunctionComponent, useEffect } from 'react'
import useChatMessages from 'hooks/useChatMessages'
import { UserStatusMessagesType } from 'types/MessagesType'
import UserAvatar from 'components/UserAvatar'
import classNames from 'classnames'
import moment from 'moment'

const User: FunctionComponent<{ data: UserStatusMessagesType }> = (props) => {
  const { data } = props

  const { selectUser } = useChatMessages()
  return (
    <>
      <div
        className={classNames('chat-widget-message', data.selected && 'active')}
        aria-hidden="true"
        style={{ borderBottom: '1px solid #eaeaf5' }}
      >
        <div className="user-status">
          <div className="user-status-avatar">
            <UserAvatar size="S" imageName={data.avatarPicture} />
          </div>

          <p className="user-status-title">
            <span className="bold">{data.fullName}</span>
          </p>

          {data.lastMessage && <p className="user-status-text small">{`${data.lastMessage.slice(0, 45)}...`}</p>}

          {data.lastMessageDate && <p className="user-status-timestamp floaty">{moment(data.lastMessageDate).fromNow()}</p>}
        </div>
      </div>
    </>
  )
}

export default User
