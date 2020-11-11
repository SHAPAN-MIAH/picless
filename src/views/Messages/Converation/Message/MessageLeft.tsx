import React, { forwardRef } from 'react'
import { MessageType } from '../../../../types/MessagesType.d'
import UserAvatar from '../../../../components/UserAvatar'

const MessageLeft = forwardRef<HTMLDivElement | null, { message: MessageType }>((props, ref) => {
  const { message } = props

  return (
    <>
      <div ref={ref} className="chat-widget-speaker left">
        <div className="chat-widget-speaker-avatar">
          <UserAvatar image={`${process.env.PUBLIC_URL}/assets/img/avatar/03.jpg`} size="TINY" />
        </div>

        <p className="chat-widget-speaker-message">{message.message}</p>

        <p className="chat-widget-speaker-timestamp">Yesterday at 8:36PM</p>
      </div>
    </>
  )
})

export default MessageLeft
