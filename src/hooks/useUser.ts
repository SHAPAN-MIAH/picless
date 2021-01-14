import _ from 'lodash'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import UserService from '../services/UserService'

import { UserType } from '../types/UserType.d'

type UseUserReturn = { getUser: () => Promise<UserType>; setUser: (userData: UserType) => boolean }

const useUser = (): UseUserReturn => {
  const { user, setUser } = useContext(UserContext.context)

  const getCurrentUser = (): Promise<UserType> => {
    const promise = new Promise<UserType>((resolve, reject) => {
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

    return promise
  }

  const setCurrentUser = (userData: UserType): boolean => {
    try {
      setUser(userData)

      return true
    } catch (err) {
      console.error(err)

      return false
    }
  }

  return {
    getUser: getCurrentUser,
    setUser: setCurrentUser,
  }
}

export default useUser
