import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import ChatService from '../../../services/ChatService'

import Chat from './Message/Chat'
import SendMessage from './SendMessage/SendMessage'

import { MessageType } from '../../../types/MessagesType.d'
// import { UserStatusMessagesType } from '../../../types/ChatType.d'
import UserAvatar from '../../../components/UserAvatar'

type ConversationProps = { user: any }

const Conversation: FunctionComponent<ConversationProps> = (props) => {
  const [chat, setChat] = useState<MessageType[]>([])
  const [connectionId, setConnectionId] = useState<string | null>()

  const { user } = props

  const latestChat = useRef<MessageType[]>(chat)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ChatService.getConnectionChat().then((connection) => {
      connection
        .start()
        .then(() => {
          setConnectionId(connection.connectionId)

          console.info(`CONNECTION ID -> ${connection.connectionId}`)

          connection.on('ReceiveMessage', (message: { message: string; user: string }) => {
            console.log(message)
            const updatedChat: MessageType[] = [...latestChat.current]

            const chatMessage: MessageType = {
              user: message.user,
              message: message.message,
              date: new Date(),
            }

            updatedChat.push(chatMessage)

            setChat(updatedChat)

            latestChat.current = updatedChat
          })
        })
        .catch((e) => console.log('Connection failed: ', e))
    })
  }, [])

  useEffect(() => {
    if (chatContainerRef && chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chat])

  const sendMessage = async (message: string) => {
    if (connectionId) {
      const chatMessage = {
        user: user.userId,
        connectionId,
        message,
      }

      try {
        await fetch(`${process.env.REACT_APP_BASE_URL_API}/chat/messagesprivate`, {
          method: 'POST',
          body: JSON.stringify(chatMessage),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } catch (e) {
        console.log('Sending message failed.', e)
      }
    }
  }

  const status = user.connectionId !== '' ? 'online' : 'offline'

  return (
    <>
      <div className="chat-widget-header">
        <div className="chat-widget-settings">
          <div className="post-settings-wrap">
            {/* <div className="post-settings widget-box-post-settings-dropdown-trigger">
              <svg className="post-settings-icon icon-more-dots">
                <use xlinkHref="#svg-more-dots" />
              </svg>
            </div>

            <div className="simple-dropdown widget-box-post-settings-dropdown">
              <p className="simple-dropdown-link">Report</p>

              <p className="simple-dropdown-link">Block</p>

              <p className="simple-dropdown-link">Mute</p>
            </div> */}
          </div>
        </div>

        <div className="user-status">
          <UserAvatar image={process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture} />

          <p className="user-status-title">
            <span className="bold">{user.fullName}</span>
          </p>

          <p className={`user-status-tag ${status}`}>{status}</p>
        </div>
      </div>
      <Chat ref={chatContainerRef} messages={chat} />
      <SendMessage sendMessage={sendMessage} />
    </>
  )
}

export default Conversation
