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

export interface ServiceStreamingType extends CommonServiceResponse {
  data: StreamingType
}
