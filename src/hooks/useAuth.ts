import { useContext, useCallback } from 'react'
import Auth from '@aws-amplify/auth'

import AuthService from '../services/AuthService'

import AuthorizationContext from '../context/AuthorizationContext'

import useUser from './useUser'
import useRouter from './useRouter'

const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthorizationContext.context)

  const router = useRouter()
  const { getUser, getSettings } = useUser()

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
                    getSettings()
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

  const changePassword = useCallback((oldPassword: string, newPassword: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      Auth.currentAuthenticatedUser().then((user) => {
        Auth.changePassword(user, oldPassword, newPassword)
          .then(() => {
            resolve('changePassword.messageSuccessfully')
          })
          .catch((err) => {
            if (err.code) {
              reject(new Error(`changePassword.errors.${err.code}`))
            } else {
              reject(new Error(`changePassword.errors.UnknownError`))
            }
          })
      })
    })
  }, [])

  const register = useCallback((username: string, password: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      Auth.signUp({
        username,
        password,
        attributes: {
          email: username,
        },
      })
        .then(() => {
          resolve('changePassword.messageSuccessfully')
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

  const confirmRegister = useCallback((email: string, code: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      Auth.confirmSignUp(email, code)
        .then(() => {
          resolve('authentication.messages.registerSuccessfully')
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

  const resendVerificationCode = useCallback((email: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      Auth.resendSignUp(email)
        .then(() => {
          resolve('authentication.resendVerificationCodeSuccess')
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

  return {
    isAuthenticated,
    checkAuthenticated,
    login,
    signOut,
    getDeviceList,
    changePassword,
    register,
    confirmRegister,
    resendVerificationCode,
  }
}

export default useAuth
