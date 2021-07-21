import { CommonServiceResponse } from './CommonTypes'

export enum StreamType {
  PLAY = 'play',
  PUBLISH = 'publish',
}

export interface StreamingType {
  tokenId: string
  streamId: string
  expireDate: number
  type: StreamType
  roomId: string
  success: boolean
  message: string
}

export interface LiveType {
  id: number
  userId: number
  liveName: string | null
  registerDate: Date
  status: string
  token: string | null
  streamId: string
  email: string
  fullName: string
  userName: string
  avatarPicture: string  
}

export interface ServiceStreamingType extends CommonServiceResponse {
  data: StreamingType
}

export interface ServiceLiveType extends CommonServiceResponse {
  data: LiveType[]
}
