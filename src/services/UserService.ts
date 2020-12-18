import * as ApiHelper from './ApiHelpers'
import {
  ProfileUserSettings,
  UploadImageType,
  UserType,
  TipType,
  UserSearchType,
  ServiceUserProfileType,
} from '../types/UserType.d'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/users`

const getUserProfile = async (): Promise<UserType> => {
  const email = await ApiHelper.getEmail()

  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const url = `${baseUrl}/getprofile?email=${email}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getUserProfileByUserName = async (userName: string): Promise<ServiceUserProfileType> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const url = `${baseUrl}/getprofilebyusername?userName=${userName}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const updateUserProfile = async (userData: UserType): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(userData),
  }

  const url = `${baseUrl}/updateprofile`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getUserSettings = async (): Promise<ProfileUserSettings> => {
  try {
    const email = await ApiHelper.getEmail()

    const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

    const requestOptions: RequestInit = {
      method: 'GET',
      headers,
    }
    const url = `${baseUrl}/getusersettings?email=${email}`

    const response = await fetch(url, requestOptions)
    const body = await response.json()

    return body
  } catch (err) {
    return err
  }
}

const updateUserSettings = async (settings: ProfileUserSettings): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: JSON.stringify(settings),
  }

  const url = `${baseUrl}/updateusersettings`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const uploadUserImages = async (data: UploadImageType): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('imageType', data.imageType.toLowerCase())
  bodyData.append('file', data.coverImage)

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: bodyData,
  }
  const url = `${baseUrl}/updateuserimage`
  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const removeDevice = async (deviceKey: string): Promise<any> => {
  const headers = await ApiHelper.requestHeaders()

  const tokenToForgetDevice = await ApiHelper.getAccessToken()

  const bodyData = new FormData()
  bodyData.append('devicekey', deviceKey)
  bodyData.append('token', tokenToForgetDevice)

  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/removeDevice`

  const response = await fetch(url, requestOptions)
  const body = await response
  return body
}

const sendATip = async (tip: TipType): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('fromId', tip.fromId.toString())
  bodyData.append('toId', tip.toId.toString())
  bodyData.append('cash', tip.cash.toString())
  bodyData.append('message', tip.message)

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/sendatip?fromId=${tip.fromId}&toId=${tip.toId}&message=${tip.message}&cash=${tip.cash}`

  const response = await fetch(url, requestOptions)
  const body = await response

  return body
}

const searchUser = async (keyword: string, signal: AbortSignal): Promise<UserSearchType[]> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }
  const url = `${baseUrl}/searchusers?keyword=${keyword}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const getSubscriptions = async (): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const url = `${baseUrl}/getsuscribers`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

export default {
  getUserProfile,
  getUserProfileByUserName,
  updateUserProfile,
  uploadUserImages,
  removeDevice,
  updateUserSettings,
  getUserSettings,
  sendATip,
  searchUser,
  getSubscriptions,
}
