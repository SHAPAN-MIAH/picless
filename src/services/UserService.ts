import { ProfileUserSettings, UploadImageType, UserType } from '../types/UserType.d'
import * as ApiHelper from './ApiHelpers'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/users`
// const baseUrl = `https://localhost:44326/users`

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

const addFavouriteUser = async (userId: number): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }
  const url = `${baseUrl}/addfavoriteuser?userId=${userId}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

export default {
  getUserProfile,
  updateUserProfile,
  uploadUserImages,
  removeDevice,
  updateUserSettings,
  getUserSettings,
  addFavouriteUser,
}
