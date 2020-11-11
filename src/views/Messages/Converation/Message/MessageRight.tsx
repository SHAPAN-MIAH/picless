import React, { forwardRef } from 'react'
import { MessageType } from '../../../../types/MessagesType.d'

const MessageRight = forwardRef<HTMLDivElement | null, { message: MessageType }>((props, ref) => {
  const { message } = props

  return (
    <>
      <div ref={ref} className="chat-widget-speaker right">
        <p className="chat-widget-speaker-message">{message.message}</p>
        <p className="chat-widget-speaker-timestamp">Yesterday</p>
      </div>
    </>
  )
})

export default MessageRight
