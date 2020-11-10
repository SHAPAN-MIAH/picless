import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder'

import SendMessage from './SendMessage/SendMessage'

import { MessageType } from '../../../types/MessagesType.d'
import Chat from './Message/Chat'

const Conversation: FunctionComponent<{}> = () => {
  const [chat, setChat] = useState<MessageType[]>([])
  const latestChat = useRef<MessageType[]>(chat)

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_BASE_URL_API}/hubs/chat`)
      .withAutomaticReconnect()
      .build()

    connection
      .start()
      .then((result) => {
        console.log('Connected!')

        connection.on('ReceiveMessage', (message) => {
          const updatedChat = [...latestChat.current]
          updatedChat.push(message)

          setChat(updatedChat)
        })
      })
      .catch((e) => console.log('Connection failed: ', e))
  }, [])

  const sendMessage = async (message: string) => {
    const chatMessage = {
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
      <Chat messages={chat} />
      <SendMessage sendMessage={sendMessage} />
    </>
  )
}

export default Conversation
