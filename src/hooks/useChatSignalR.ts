import { useState, useEffect } from 'react'
import { HubConnection } from '@microsoft/signalr'
import useChatMessages from './useChatMessages'
import ChatService from 'services/ChatService'
import { OnReceiveMessageType } from 'types/MessagesType'

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
      connection?.stop()
    }
  }, [])

  useEffect(() => {
    if (connection) {
      connection.off('ReceiveMessage')
      connection.off('NotifyOnline')
      connection.off('NotifyOffline')

      connection.on('ReceiveMessage', onReceiveMessage)

      connection.on('NotifyOnline', onConnectUser)

      connection.on('NotifyOffline', onDisconnectUser)
    }
  }, [connection, userSelected])

  const onReceiveMessage = function (message: OnReceiveMessageType) {
    if (Number(userSelected?.userId) === Number(message?.fromUserId)) receiveMessage(message)
  }

  const onConnectUser = function (userId: number) {
    changeUserStatus(userId, 'ONLINE')
  }

  const onDisconnectUser = function (userId: number) {
    console.log('disconnected')
    changeUserStatus(userId, 'OFFLINE')
  }

  return {}
}

export default useChatSignalR
