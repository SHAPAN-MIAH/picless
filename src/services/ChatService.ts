import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import * as ApiHelper from './ApiHelpers'

import { MessageType } from '../types/MessagesType.d'

const baseUrlUsers = `${process.env.REACT_APP_BASE_URL_API}/users`
const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/chat`

const getConnectionChat = async (): Promise<HubConnection> => {
  const email = await ApiHelper.getEmail()
  const token = await ApiHelper.getIdToken()

  const connection = new HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_BASE_URL_API}/hubs/chat?email=${email}`, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build()

  return connection
}

const getChatHistoryByUser = async (userId: number): Promise<MessageType[]> => {
  const headers = await ApiHelper.requestHeaders()

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrlUsers}/getchatMessages?userId=${userId}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getFavoriteUsers = async (): Promise<any> => {
  const headers = await ApiHelper.requestHeaders()

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrlUsers}/getfavoriteusers`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const sendMessage = async (message: MessageType): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(message),
  }

  const url = `${baseUrl}/messagesprivate`
  return fetch(url, requestOptions)
}

export default { getConnectionChat, getChatHistoryByUser, getFavoriteUsers, sendMessage }
