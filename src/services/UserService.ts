import { Auth } from '@aws-amplify/auth'
import { UploadImageType, UserType } from '../types/UserType'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/users`

const getUserProfile = async (): Promise<UserType> => {
  const user = await Auth.currentSession()

  const { email } = user.getIdToken().payload
  const token = user.getIdToken().getJwtToken()

  console.log(token)

  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
  }

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: requestHeaders,
  }
  const url = `${baseUrl}/getprofile?email=${email}`

  console.log(requestOptions)
  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const updateUserProfile = async (userData: UserType): Promise<any> => {
  const user = await Auth.currentSession()

  const token = user.getIdToken().getJwtToken()

  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
  }

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify(userData),
  }
  const url = `${baseUrl}/updateprofile`

  console.log(requestOptions)
  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const uploadUserImages = async (data: UploadImageType): Promise<any> => {
  const user = await Auth.currentSession()

  const token = user.getIdToken().getJwtToken()

  const requestHeaders = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    type: 'formData',
  }

  const bodyData = new FormData()
  bodyData.set('imageType', data.imageType.toLowerCase())
  bodyData.append('coverImage', data.coverImage, data.coverImage.name)

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: requestHeaders,
    body: bodyData,
  }
  const url = `${baseUrl}/updateuserimage`

  console.log(requestOptions)
  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

export default { getUserProfile, updateUserProfile, uploadUserImages }
