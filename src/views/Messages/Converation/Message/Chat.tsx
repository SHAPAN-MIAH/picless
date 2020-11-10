import React, { FunctionComponent } from 'react'

import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'

import { MessageType } from '../../../../types/MessagesType.d'

const Chat: FunctionComponent<{ messages: MessageType[] }> = (props) => {
  const { messages } = props

  const currentUser = 'User 1'

  const chat = messages.map((m) => {
    let msg
    if (currentUser === m.user) {
      msg = <MessageLeft message={{ user: 'User 1', message: 'asdfsdfdsa', date: new Date() }} />
    } else {
      msg = <MessageRight message={{ user: 'User 2', message: 'asdfsdfdsa', date: new Date() }} />
    }

    return msg
  })

  return (
    <>
      <div className="chat-widget-conversation" data-simplebar>
        {chat}
      </div>
    </>
  )
}

export default Chat
