import { CommonPostType, ServiceMediaTypes, ServicePostType } from '../types/PostType.d'
import * as ApiHelper from './ApiHelpers'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/posts`

const uploadPostResource = async (bodyData: FormData): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/uploadpostfile`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const createPost = async (post: CommonPostType) => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(post),
  }

  const url = `${baseUrl}/addpost`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getPosts = async (): Promise<ServicePostType> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getpostsbyuser`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getMedia = async (type: 'photos' | 'videos', page = 0, userId: number): Promise<ServiceMediaTypes> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getmedia?mediatype=${type}&userId=${userId}&page=${page}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

export default {
  uploadPostResource,
  createPost,
  getPosts,
  getMedia,
}
