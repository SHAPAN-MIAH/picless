import React, { FunctionComponent, useEffect } from 'react'
import { UserStatusMessagesType } from 'types/MessagesType'
import UserAvatar from 'components/UserAvatar'
import classNames from 'classnames'
import moment from 'moment'
import styled from 'styled-components'

const UnreadMessage = styled.div`
  width: 10px;
  height: 10px;
  background-color: #23d2e2;
  display: inline-block;
  border-radius: 8px;
  margin-right: 7px;
`

const User: FunctionComponent<{ data: UserStatusMessagesType }> = (props) => {
  const { data } = props

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
            {data.hasUnreadMessages && <UnreadMessage />}
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
