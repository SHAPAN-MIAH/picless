import { CommonServiceResponse } from 'types/CommonTypes'
import {
  CommonPostType,
  ReactionCodeType,
  ServiceMediaTypes,
  ServicePostType,
  ServiceReactionPostType,
  ServiceSinglePostType,
} from '../types/PostType.d'
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

const createPost = async (post: Partial<CommonPostType>) => {
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

const editPost = async (post: Partial<CommonPostType>) => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('postId', post.id?.toString() || '')
  bodyData.append('content', post.content?.toString() || '')
  bodyData.append('privacity', post.privacity?.toString() || '')
  bodyData.append('startDate', post.startDate?.toString() || '')
  bodyData.append('amount', post.amount?.toString() || '')

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/editpost`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getPosts = async (page = 0, userName = ''): Promise<ServicePostType> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getpostsbyuser?page=${page}${userName ? `&userName=${userName}` : ''}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  // console.log(body)
  return body

}

const getPurchasedPosts = async (page = 0): Promise<ServicePostType> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getmybuyedposts?page=${page}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getSavedPosts = async (page = 0): Promise<ServicePostType> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getsaveposts?page=${page}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getPostById = async (id = 0): Promise<ServiceSinglePostType> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getpostbyid?id=${id}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getMedia = async (type: 'images' | 'videos', page = 0, userId: number): Promise<ServiceMediaTypes> => {
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

const deletePost = async (postId: number) => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('postId', postId.toString())

  const requestOptions: RequestInit = {
    method: 'delete',
    headers,
    body: bodyData,
  }
  const url = `${baseUrl}/deletepost`
  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const addReaction = async (postId = 0, reactionCode: ReactionCodeType): Promise<ServiceReactionPostType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('postId', postId.toString())
  bodyData.append('reactionCode', reactionCode)

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/addreaction`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const deleteReaction = async (reactionId = 0): Promise<CommonServiceResponse> => {
const headers = await ApiHelper.requestHeaders({ type: 'formData' })

const bodyData = new FormData()
bodyData.append('reactionId', reactionId.toString())

const requestOptions: RequestInit = {
  method: 'DELETE',
  headers,
  body: bodyData,
}
const url = `${baseUrl}/deletereaction`
const response = await fetch(url, requestOptions)
const body = await response.json()

return body
}

const addSavedPost = async (postId: number): Promise<CommonServiceResponse> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('postId', postId.toString())

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/addsavedpost`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const removeSavedPost = async (postId: number): Promise<CommonServiceResponse> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('postId', postId.toString())

  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/deletesavedpost`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

export default {
  uploadPostResource,
  createPost,
  editPost,
  deletePost,
  getPosts,
  getPurchasedPosts,
  getSavedPosts,
  getPostById,
  getMedia,
  addReaction,
  deleteReaction,
  addSavedPost,
  removeSavedPost
}
