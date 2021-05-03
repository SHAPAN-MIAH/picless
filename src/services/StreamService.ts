import { ServiceStreamingType, StreamType } from '../types/StreamingType'
import * as ApiHelper from './ApiHelpers'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/streaming`

const getToken = async (type: StreamType, signal?: AbortSignal): Promise<ServiceStreamingType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${baseUrl}/getToken?type=${type}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

export default { getToken }
