import _ from 'lodash'
import { useCallback, useContext } from 'react'
import toast from 'react-hot-toast'

import UserContext from '../context/UserContext'

import UserService from '../services/UserService'

import { UserSettingsType, UserType } from '../types/UserType.d'

type UseUserReturn = {
  userId: string
  getUser: () => Promise<UserType>
  getSettings: (needsUpdate?: boolean) => Promise<UserSettingsType>
  updateUser: (userData: Partial<UserType>, toastOptions?: ToastPromiseOptions) => Promise<boolean>
  updateSettings: (settingsData: Partial<UserSettingsType>, toastOptions?: ToastPromiseOptions) => Promise<boolean>
}
type ToastPromiseOptions = { loading: string; success: string; error: string }

const defaultToastOptions = {
  loading: 'Saving information ...',
  success: 'The form has been successfully saved',
  error: 'Error Saving the form',
}

const useUser = (): UseUserReturn => {
  const { user, setUser, userId, settings, setSettings } = useContext(UserContext.context)

  const getCurrentUser = useCallback((): Promise<UserType> => {
    return new Promise<UserType>((resolve, reject) => {
      if (_.isEmpty(user)) {
        UserService.getUserProfile()
          .then((userData) => {
            setUser(userData)

            resolve(userData)
          })
          .catch((err) => {
            reject(err)
          })
      } else {
        resolve(user)
      }
    })
  }, [setUser, user])

  const updateUser = useCallback(
    (userData: Partial<UserType>, toastOptions: ToastPromiseOptions = defaultToastOptions): Promise<boolean> => {
      return getCurrentUser().then((u: UserType) => {
        const updated = { ...u, ...userData }

        const toastPromise = UserService.updateUserProfile(updated)

        return toast.promise(toastPromise, toastOptions).then((newUserData: UserType) => {
          setUser(newUserData)

          return true
        })
      })
    },
    [setUser, getCurrentUser]
  )

  const updateSettings = useCallback(
    (settingsData: Partial<UserSettingsType>, toastOptions: ToastPromiseOptions = defaultToastOptions): Promise<boolean> => {
      return getSettings().then((s: UserSettingsType) => {
        const updated = { ...s, ...settingsData }

        const toastPromise = UserService.updateUserSettings(updated)

        return toast.promise(toastPromise, toastOptions).then((newUserData: any) => {
          // setUser(newUserData)
          console.log(newUserData)
          return true
        })
      })
    },
    [setUser, getCurrentUser]
  )

  const getSettings = useCallback(
    (needsUpdate?: boolean): Promise<UserSettingsType> => {
      return new Promise<UserSettingsType>((resolve, reject) => {
        if (needsUpdate || _.isEmpty(settings)) {
          UserService.getUserSettings()
            .then((s: UserSettingsType) => {
              setSettings(s)

              resolve(s)
            })
            .catch((err) => {
              reject(err)
            })
        } else {
          resolve(settings)
        }
      })
    },
    [setSettings, settings]
  )

  return {
    userId,
    getUser: getCurrentUser,
    getSettings,
    updateSettings,
    updateUser,
  }
}

export default useUser
