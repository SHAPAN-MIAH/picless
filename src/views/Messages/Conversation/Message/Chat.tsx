import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'

import * as Utils from '../../../../utils/Functions'

import { userIdSelector } from '../../../../redux/User/UserSelectors'

import MessageLeft from './MessageLeft'
import MessageRight from './MessageRight'

import { MessageType, SingleMessageTypeRef } from '../../../../types/MessagesType.d'

const Chat = forwardRef<HTMLDivElement | null, { messages: MessageType[] }>((props, ref) => {
  const { messages } = props

  const userId: number = useSelector(userIdSelector)

  let prevMessageUser: MessageType
  const chat = messages.map((m, index, array) => {
    const propsMessage: SingleMessageTypeRef = {
      key: Utils.simpleKeyGenerator(5),
      message: m,
    }

    if (messages.length - 1 === index) {
      propsMessage.ref = ref
    }

    if (prevMessageUser && m.fromUserId === prevMessageUser.fromUserId) {
      propsMessage.showAvatar = false

      if (array.length > index + 1 && array[index + 1].fromUserId !== m.fromUserId) {
        propsMessage.showTime = true
      }
    } else {
      propsMessage.showTime = false
    }

    prevMessageUser = m

    if (userId === m.fromUserId) {
      return <MessageRight {...propsMessage} />
    }
    return <MessageLeft {...propsMessage} />
  })

  return (
    <>
      <div className="chat-widget-conversation">
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
