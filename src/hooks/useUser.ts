import _ from 'lodash'
import { useCallback, useContext } from 'react'
import toast from 'react-hot-toast'

import UserContext from '../context/UserContext'

import UserService from '../services/UserService'

import { UserType } from '../types/UserType.d'

type UseUserReturn = {
  getUser: () => Promise<UserType>
  updateUser: (userData: Partial<UserType>, toastOptions?: ToastPromiseOptions) => Promise<boolean>
}
type ToastPromiseOptions = { loading: string; success: string; error: string }

const defaultToastOptions = {
  loading: 'Saving information ...',
  success: 'The form has been successfully saved',
  error: 'Error Saving the form',
}

const useUser = (): UseUserReturn => {
  const { user, setUser } = useContext(UserContext.context)

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

  return {
    getUser: getCurrentUser,
    updateUser,
  }
}

export default useUser
