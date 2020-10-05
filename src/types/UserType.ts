export interface UserAuthType {
  token: string
  email: string
}

export interface UserType {
  id?: number
  email?: string
  emailConfirmed?: boolean
  emailRecovery?: string
  phoneNumber?: string
  phoneNumberConfirmed?: boolean
  userName?: string
  firstName?: string
  lastName?: string
  fullName?: string
  profilePicture?: string
  coverPicture?: string
  birthDate?: Date
  profileDescription?: string
  genderId?: number // See how to translate to a type
  countryId?: number
  cityName?: string
  numberOfFollwer?: number
  languageId?: number
  roleId?: any
  statusId?: any
  registrationDate?: Date
  country?: any
  gender?: any
  language?: any
  role?: any
  userStatus?: any
  userPaymentMethod?: any[]
}

export type ImageType = 'PROFILE' | 'COVER'

export type UploadImageType = {
  imageType: ImageType
  coverImage: File
}
