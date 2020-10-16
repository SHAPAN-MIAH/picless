import { Auth } from '@aws-amplify/auth'

export const requestHeaders = async (extraHeaders?: any) => {
  const token = await getIdToken()

  return {
    Authorization: `Bearer ${token}`,
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    ...extraHeaders,
  }
}

export const getIdToken = async () => (await Auth.currentSession()).getIdToken().getJwtToken()
export const getAccessToken = async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
export const getEmail = async () => (await Auth.currentSession()).getIdToken().payload.email
