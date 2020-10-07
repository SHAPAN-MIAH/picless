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
  //const url = 'https://localhost:44326/users/getprofile?email=${email}'

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
  //const url = 'https://localhost:44326/users/updateprofile'
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
    //'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + token,
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    type: 'formData',
  }

  const bodyData = new FormData()
  bodyData.append('imageType', data.imageType.toLowerCase())
  //bodyData.append('coverImage', data.coverImage, data.coverImage.name)
  bodyData.append('file', data.coverImage)

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: requestHeaders,
    body: bodyData,
  }
  const url = `${baseUrl}/updateuserimage`
  //const url = 'https://localhost:44326/users/updateuserimage'

  console.log(requestOptions)
  const response = await fetch(url, requestOptions)
  const body = await response.json()

  return body
}

const removeDevice = async (deviceKey: string): Promise<any> => {
  const user = await Auth.currentSession()

  const token = user.getIdToken().getJwtToken()
  const tokenToForgetDevice = user.getAccessToken().getJwtToken();



  const requestHeaders = {
    //'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
  }

  const bodyData = new FormData()
  bodyData.append('devicekey', deviceKey)
  bodyData.append('token', tokenToForgetDevice)

  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: requestHeaders,
    body: bodyData,
  }

  const url = `${baseUrl}/removeDevice`

  const response = await fetch(url, requestOptions)
  const body = await response
  return body
}

export default { getUserProfile, updateUserProfile, uploadUserImages, removeDevice }
