import React, { useState, useEffect, useRef } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import useChatMessages from './useChatMessages'
import ChatService from 'services/ChatService'
import { OnReceiveMessageType } from 'types/MessagesType'
import useUser from './useUser'

const useChatSignalR = () => {
  const { receiveMessage, userSelected } = useChatMessages()

  const [connection, setConnection] = useState<HubConnection | null>(null)

  useEffect(() => {
    ChatService.getConnectionChat().then((conn) => {
      conn.start().catch((e) => console.log('Connection failed: ', e))

      setConnection(conn)
    })

    return () => {
        console.log('STOPED')
        connection?.stop();
      };
  }, [])

  useEffect(() => {
    if (connection) {
        connection.off('ReceiveMessage')
        connection.off('NotifyOnline')

      connection.on('ReceiveMessage', onReceiveMessage)

      connection.on('NotifyOnline', (data: number) => {
        // dispatch(changeStatus(data))
      })
    }
  }, [connection, userSelected])

  const onReceiveMessage = function (message: OnReceiveMessageType) {

    if(Number(userSelected?.userId) === Number(message?.fromUserId))
    receiveMessage(message)
  }

  return {}
}

export default useChatSignalR
