import { ServiceLiveType } from './../types/StreamingType';
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

const getStreamAuth = async (streamId: string, signal?: AbortSignal): Promise<ServiceStreamingType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${baseUrl}/getToken?type=play&streamId=${streamId}}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getLives = async (signal?: AbortSignal): Promise<ServiceLiveType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${baseUrl}/getLives`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

export default { getToken, getStreamAuth, getLives }
