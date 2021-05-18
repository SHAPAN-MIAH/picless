import React, { useState, useEffect, useRef } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import useChatMessages from './useChatMessages'
import ChatService from 'services/ChatService'
import { OnReceiveMessageType } from 'types/MessagesType'
import useUser from './useUser'

const useChatSignalR = () => {
  const { receiveMessage, userSelected, notifyConnected, changeUserStatus } = useChatMessages()

  const [connection, setConnection] = useState<HubConnection | null>(null)

  useEffect(() => {
    ChatService.getConnectionChat().then((conn) => {
      conn
        .start()
        .then(() => {
          notifyConnected()
        })
        .catch((e) => console.log('Connection failed: ', e))

      setConnection(conn)
    })

    return () => {
      console.log('STOPED')
      connection?.stop()
    }
  }, [])

  useEffect(() => {
    if (connection) {
      connection.off('ReceiveMessage')
      connection.off('NotifyOnline')

      connection.on('ReceiveMessage', onReceiveMessage)

      connection.on('NotifyOnline', onChangeStatus)
    }
  }, [connection, userSelected])

  const onReceiveMessage = function (message: OnReceiveMessageType) {
    if (Number(userSelected?.userId) === Number(message?.fromUserId)) receiveMessage(message)
  }

  const onChangeStatus = function (userId: number) {
    changeUserStatus(userId)
  }

  return {}
}

export default useChatSignalR
