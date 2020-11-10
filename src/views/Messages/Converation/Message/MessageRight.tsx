import React, { FunctionComponent } from 'react'
import { MessageType } from '../../../../types/MessagesType.d'

const MessageRight: FunctionComponent<{ message: MessageType }> = (props) => {
  const { message } = props

  return (
    <>
      <div className="chat-widget-speaker right">
        <p className="chat-widget-speaker-message">{message.message}</p>
        <p className="chat-widget-speaker-timestamp">{message.date || new Date().toString()}</p>
      </div>
    </>
  )
}

export default MessageRight
