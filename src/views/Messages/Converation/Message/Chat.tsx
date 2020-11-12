import React, { forwardRef } from 'react'

import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'

import { MessageType } from '../../../../types/MessagesType.d'

const Chat = forwardRef<HTMLDivElement | null, { messages: MessageType[] }>((props, ref) => {
  const { messages } = props

  const currentUser = 'User 1'

  const chat = messages.map((m, index) => {
    const propsMessage: { key: string; message: MessageType; ref?: any } = {
      key: m.date.toISOString(),
      message: m,
    }

    if (messages.length - 1 === index) {
      propsMessage.ref = ref
    }

    if (currentUser === m.user) {
      return <MessageRight {...propsMessage} />
    }
    return <MessageLeft {...propsMessage} />
  })

  return (
    <>
      <div className="chat-widget-conversation" data-simplebar>
        {chat || (
          <div className="chat-widget-speaker right">
            <p className="chat-widget-speaker-message">No Messages</p>
          </div>
        )}
      </div>
    </>
  )
})

export default Chat
