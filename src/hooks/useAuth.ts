import { useContext, useCallback } from 'react'
import Auth from '@aws-amplify/auth'

import AuthService from '../services/AuthService'

import AuthorizationContext from '../context/AuthorizationContext'

import useUser from './useUser'
import useRouter from './useRouter'

const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthorizationContext.context)

  const router = useRouter()
  const { getUser } = useUser()

  const checkAuthenticated = useCallback(async (): Promise<void> => {
    return AuthService.currentSession()
      .then(async (user: any) => {
        const userTokenId = await user.getIdToken()

        if (userTokenId) setIsAuthenticated(true)
        else setIsAuthenticated(false)
      })
      .catch((err) => setIsAuthenticated(false))
  }, [setIsAuthenticated])

  const signOut = useCallback(async () => {
    return Auth.signOut().then(() => {
      setIsAuthenticated(false)

      router.push('/')
    })
  }, [])

  const login = useCallback((userName: string, password: string, rememberMe: boolean) => {
    return new Promise<string>((resolve, reject) => {
      AuthService.login(userName, password)
        .then(async (user) => {
          if (user.attributes.email_verified) {
            user.getCachedDeviceKeyAndPassword()

            const remembeDevicerOrNot = {
              onSuccess: (): void => {
                checkAuthenticated().then(() => {
                  resolve(`authentication.messages.successfullyLoggedIn`)

                  getUser().then(() => {
                    router.push('/user/home')
                  })
                })
              },
              onFailure: (err: any) => {
                reject(new Error(`authentication.errors.${err.code}`))
              },
            }

            // Remember device
            if (rememberMe) {
              user.setDeviceStatusRemembered(remembeDevicerOrNot)
            } else {
              user.setDeviceStatusNotRemembered(remembeDevicerOrNot)
            }
          } else {
            reject(new Error(`authentication.errors.confirmYourEmailAccount`))
          }
        })
        .catch((err) => {
          if (err.code) {
            reject(new Error(`authentication.errors.${err.code}`))
          } else {
            reject(new Error(`authentication.errors.UnknownError`))
          }
        })
    })
  }, [])

  const getDeviceList = useCallback(() => {
    return new Promise<string>((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then((data) => {
          data.listDevices(20, null, {
            onSuccess: (list: any): void => {
              resolve(list.Devices)
            },
            onFailure: (err: any) => {
              reject(new Error(`authentication.errors.${err.code}`))
            },
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }, [])

  return {
    isAuthenticated,
    checkAuthenticated,
    login,
    signOut,
    getDeviceList,
  }
}

export default useAuth
