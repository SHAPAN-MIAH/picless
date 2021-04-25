import { CommonServiceResponse } from './CommonTypes'

export enum TypeOfNotifications {
  POSTLIKE = 'POSTLIKE',
  NEWSUBSCRIBER = 'NEWSUBSCRIBER',
  RECEIVETIP = 'RECEIVETIP',
  ACCOUNTVERIFIED = 'ACCOUNTVERIFIED',
  NEWLIVE = 'NEWLIVE',
  NEWCHATMESSAGE = 'NEWCHATMESSAGE',
}

export interface NotificationType {
  id: number
  registerDate: Date
  type: TypeOfNotifications
  message: string
  amount: number
  sourceUserId: number
  sourceFullName: string
  readed: boolean
  userId: number
}

export interface ServiceNotificationType extends CommonServiceResponse {
  data: NotificationType[]
}
