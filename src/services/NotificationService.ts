import { ServiceNotificationType } from '../types/NotificationType'
import * as ApiHelper from './ApiHelpers'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/notifications`

const getNotifications = async (): Promise<ServiceNotificationType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getnotifications`
  const response = await fetch(url, requestOptions)

  const body = await response.json()
  return body
}

export default { getNotifications }
