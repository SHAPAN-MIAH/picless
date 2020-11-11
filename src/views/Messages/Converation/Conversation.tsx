import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder'

import SendMessage from './SendMessage/SendMessage'

import { MessageType } from '../../../types/MessagesType.d'
import Chat from './Message/Chat'

const Conversation: FunctionComponent<{}> = () => {
  const [chat, setChat] = useState<MessageType[]>([])
  const latestChat = useRef<MessageType[]>(chat)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_BASE_URL_API}/hubs/chat`)
      .withAutomaticReconnect()
      .build()

    connection
      .start()
      .then((result) => {
        console.log('Connected!')
        connection.on('ReceiveMessage', (message: { message: string; user: string }) => {
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
      await fetch(`${process.env.REACT_APP_BASE_URL_API}/chat/messages`, {
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
