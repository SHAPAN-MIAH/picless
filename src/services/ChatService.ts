import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import * as ApiHelper from './ApiHelpers'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/users`

const getConnectionChat = async (): Promise<HubConnection> => {
  const email = await ApiHelper.getEmail()
  const token = await ApiHelper.getIdToken()

  const connection = new HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_BASE_URL_API}/hubs/chat?email=${email}&token=${token}`)
    .withAutomaticReconnect()
    .build()

  return connection
}

const getFavoriteUsers = async (): Promise<any> => {
  const headers = await ApiHelper.requestHeaders()

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getfavoriteusers`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

export default { getFavoriteUsers, getConnectionChat }
