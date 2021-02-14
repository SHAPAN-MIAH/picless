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
  languageId?: any
  registrationDate?: string
  country?: any
  countryId?: any
  countryName?: string
  regionName?: string
  gender?: any
  language?: any
  tagLine?: string
  planId?: string
  occupationId?: number
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

export interface SubscriptorListType {
  id: number
  registerDate: Date
  suscribeUser: UserProfileType
}

export type ServiceUserProfileType = {
  code?: string
  message?: string
  user: UserProfileType
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
}
