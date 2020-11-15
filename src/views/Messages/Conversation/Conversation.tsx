import React, { FunctionComponent, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ChatService from '../../../services/ChatService'
import { userIdSelector } from '../../../redux/User/UserSelectors'

import { sendMessageChat, addMessageChat } from '../../../redux/Chat/ChatThunks'
import { loadingSelector, getCurrentChat } from '../../../redux/Chat/ChatSelectors'

import Chat from './Message/Chat'
import SendMessage from './SendMessage/SendMessage'
import HeaderConversation from './HeaderConversation/HeaderConversation'

import { UserStatusMessagesType, MessageType } from '../../../types/MessagesType.d'

type ConversationProps = { user: UserStatusMessagesType }

const Conversation: FunctionComponent<ConversationProps> = (props) => {
  const dispatch = useDispatch()

  const loading: boolean = useSelector(loadingSelector)
  const currentUserId: number = useSelector(userIdSelector)
  const currentChat: MessageType[] = useSelector(getCurrentChat)

  const { user } = props

  const chatContainerRef = useRef<HTMLDivElement>(null)

  let lastMessage: string = ''

  // MountComponent
  useEffect(() => {
    ChatService.getConnectionChat().then((connection) => {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessage', (message: { registerDate?: string; message: string; user: string }) => {
            console.group('ReceiveMessage')
            console.dir(message)

            if (lastMessage !== message.message) {
              const registerDate = message.registerDate ? message.registerDate : new Date().toISOString()

              const chatMessage: MessageType = {
                user: user.email,
                connectionId: user.connectionId,
                type: 'TEXT',
                message: message.message,
                registerDate,
                fromUserId: user.userId,
                senderUserId: user.userId,
                toUserId: currentUserId,
                receivedUserId: currentUserId,
              }

              dispatch(addMessageChat(chatMessage))

              lastMessage = message.message
            }
          })
        })
        .catch((e) => console.log('Connection failed: ', e))
    })
  }, [])

  // UpdateComponent
  useEffect(() => {
    if (!loading && chatContainerRef && chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentChat, user])

  const sendMessage = async (message: string) => {
    console.log(`User ConnectionId -> ${user.connectionId}`)
    if (user.email) {
      const chatMessage: MessageType = {
        user: user.email,
        connectionId: user.connectionId,
        type: 'TEXT',
        message,
        registerDate: new Date().toISOString(),
        fromUserId: currentUserId,
        senderUserId: currentUserId,
        toUserId: user.userId,
        receivedUserId: user.userId,
      }

      try {
        dispatch(sendMessageChat(chatMessage))
      } catch (e) {
        console.log('Sending message failed.', e)
      }
    }
  }

  return (
    <>
      <div className="chat-widget-header">
        <HeaderConversation user={user} />
      </div>
      {currentChat && <Chat ref={chatContainerRef} messages={currentChat} />}
      <SendMessage sendMessage={sendMessage} />
    </>
  )
}

export default Conversation
