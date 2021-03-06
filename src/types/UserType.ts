import { CommonServiceResponse } from './CommonTypes'

export interface UserStateType {
  loading: boolean
  error: string
  message: string
  data: UserType
}

export interface UserType {
  id?: number
  email?: string
  emailConfirmed?: boolean
  emailRecovery?: any
  phoneNumber?: any
  phoneNumberConfirmed?: boolean
  userName?: any
  firstName?: any
  lastName?: any
  fullName?: any
  profilePicture?: any
  coverPicture?: any
  birthDate?: any
  profileDescription?: any
  genderId?: any
  cityName?: any
  numberOfFollowers?: number
  numberImages?: number
  numberVideos?: number
  languageId?: any
  registrationDate?: string
  countryCode?: string
  regionName?: string
  gender?: string
  language?: any
  tagLine?: string
  planId?: string
  occupationId?: number
  verifiedAccount?: boolean
  countryTax?: number
  occupation?: OccupationType
  userInterest?: UserInterestType[]
  userTimeLine?: UserTimeLineType[]
}

export interface UserInterestType {
  id?: number
  userId?: number
  name?: string
  description?: string
}

export interface UserTimeLineType {
  id?: number
  userId?: number
  title?: string
  description?: string
  yearSarted?: string
  yearEnded?: string
}

export type ImageType = 'PROFILE' | 'COVER'

export type UploadImageType = {
  imageType: ImageType
  coverImage: File
}

export type Device = {
  DeviceAttributes: [{ Name: string; Value: string }]
  DeviceLastAuthenticatedDate: string
}

export interface UserProfileType extends UserType {
  numberImages: number
  numberOfFollowers: number
  numberVideos: number
  numberPosts: number
}

export interface TipType {
  fromId: string
  toId: string
  message: string
  cash: number
}

export interface UserSearchType {
  userId: number
  fullName: string
  userName: string
  avatarPicture: string
}

export interface SubscriptionType {
  id: number
  suscriptionId: number
  cancelAtPeriodEnd: boolean
  created: number
  currentPeriodEnd: number
  currentPeriodStart: number
}

export interface SubscriptorListType {
  id: number
  registerDate: Date
  subscriptionId: number
  suscribeUser: UserProfileType
  subscription: SubscriptionType
}

export type ServiceUserProfileType = {
  code?: string
  message?: string
  user: UserProfileType
  subscription: SubscriptionType
  isSuscribe: boolean
}

export type OccupationType = {
  id: number
  name: string
}

export type UserSettingsType = {
  enabledPushNotificatoins?: boolean
  enabledEmailNotificatoins?: boolean
  notificationComments?: boolean
  notificationNewSuscriber?: boolean
  notificationTips?: boolean
  notificationsMessage?: boolean
  privacityDisplayProfileInSearchBar?: boolean
  privacityDisplayChatActivity?: boolean
  privacityGoogleAuthenticator?: boolean
  privacityWhoCanSendMessage?: string
  users?: object
  displayAdultContent?: boolean
}

export interface ServiceSubscriptorListType extends CommonServiceResponse {
  suscribers: SubscriptorListType[]
}
