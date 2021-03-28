import _ from 'lodash'
import { useCallback, useContext, useEffect } from 'react'
import toast from 'react-hot-toast'
import UserContext from '../context/UserContext'
import UserService from '../services/UserService'
import { UploadImageType, UserSettingsType, UserType } from '../types/UserType.d'




type UseUserReturn = {
  userId: string
  user: UserType
  getUser: () => Promise<UserType>
  getSettings: (needsUpdate?: boolean) => Promise<UserSettingsType>
  updateUser: (userData: Partial<UserType>, toastOptions?: ToastPromiseOptions) => Promise<boolean>
  updateSettings: (settingsData: Partial<UserSettingsType>, toastOptions?: ToastPromiseOptions) => Promise<boolean>
  uploadImage: (data: UploadImageType) => Promise<void>
}
type ToastPromiseOptions = { loading: string; success: string; error: string }

const defaultToastOptions = {
  loading: 'Saving information ...',
  success: 'The form has been successfully saved',
  error: 'Error Saving the form',
}

const useUser = (): UseUserReturn => {
  const { user, setUser, userId, settings, setSettings } = useContext(UserContext.context)

  useEffect(() => {
    getCurrentUser()
  }, [user])

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

        return toast
          .promise(toastPromise, toastOptions)
          .then((newUserData: UserType) => {
            setUser(newUserData)

            return true
          })
          .catch(() => {
            toast.error('Error saving the data')

            return false
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

        return toast.promise(toastPromise, toastOptions).then((data: any) => {
          if (data.code === 0) setSettings(updated)
          else {
            throw new Error('Error updating settings')
          }
          return true
        })
      })
    },
    [setUser, getCurrentUser]
  )

  const getSettings = useCallback((): Promise<UserSettingsType> => {
    return new Promise<UserSettingsType>((resolve, reject) => {
      if (_.isEmpty(settings)) {
        UserService.getUserSettings()
          .then((s: UserSettingsType) => {
            delete s.users
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
  }, [setSettings, settings])

  const uploadImage = useCallback((data: UploadImageType) => {
    const toastPromise = UserService.uploadUserImages(data)

    const toastOptions = {
      loading: 'Uploading image',
      success: 'Image uploded',
      error: 'Error uploading image',
    }

    return toast.promise(toastPromise, toastOptions).then((newUserData: UserType) => {
      setUser(newUserData)
    })
  }, [])

  return {
    userId,
    user,
    getUser: getCurrentUser,
    getSettings,
    updateSettings,
    updateUser,
    uploadImage,
  }
}

export default useUser
