import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

import ChatService from '../../../services/ChatService'

import Chat from './Message/Chat'
import SendMessage from './SendMessage/SendMessage'

import { MessageType } from '../../../types/MessagesType.d'

const Conversation: FunctionComponent<{}> = () => {
  const [chat, setChat] = useState<MessageType[]>([])
  const latestChat = useRef<MessageType[]>(chat)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ChatService.getConnectionChat().then((connection) => {
      connection
        .start()
        .then(() => {
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
    const chatMessage = {
      user: 'User 1',
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

  return (
    <>
      <Chat ref={chatContainerRef} messages={chat} />
      <SendMessage sendMessage={sendMessage} />
    </>
  )
}

export default Conversation
