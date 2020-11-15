import React, { forwardRef } from 'react'
import moment from 'moment'

import { MessageType } from '../../../../types/MessagesType.d'

const MessageRight = forwardRef<HTMLDivElement | null, { message: MessageType }>((props, ref) => {
  const { message } = props

  const contentMsg = message.content || message.message

  return (
    <>
      <div ref={ref} className="chat-widget-speaker right">
        <p className="chat-widget-speaker-message">{contentMsg}</p>
        <p className="chat-widget-speaker-timestamp">{moment(message.registerDate).fromNow()}</p>
      </div>
    </>
  )
})

export default MessageRight
