import { CommonServiceResponse } from './CommonTypes'

export enum TypeOfNotifications {
  POSTLIKE = 'POSTLIKE',
  NEWSUBSCRIBER = 'NEWSUSCRIBER',
  RECEIVETIP = 'RECEIVETIP',
  ACCOUNTVERIFIED = 'ACCOUNTVERIFIED',
  NEWLIVE = 'NEWLIVE',
  SENDTIP = 'SENDTIP',
  NEWCHATMESSAGE = 'NEWCHATMESSAGE',
}

export interface NotificationType {
  id: number
  registerDate: Date
  type: TypeOfNotifications
  postId: number
  postType: string
  profilePicture: string
  message: string
  amount: number
  sourceUserId: number
  fullName: string
  userName: string
  readed: boolean
  userId: number
}

export interface ServiceNotificationType extends CommonServiceResponse {
  data: NotificationType[]
}
