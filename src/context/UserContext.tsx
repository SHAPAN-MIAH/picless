import React, { ReactNode, useCallback, useState } from 'react'
import { UserType } from '../types/UserType.d'
import useLocalStorage from '../hooks/useLocalStorage'

interface UserContextProps {
  user: UserType
  loading: boolean
  userId: string
  setUser: (value: UserType) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultContextValues: UserContextProps = {
  user: {},
  loading: false,
  userId: '-1',
  setUser: (value: any): void => {
    console.warn(`Error on UserContext (Define correctly) - ${value}`)
  },
  setLoading: (value: any): void => {
    console.warn(`Error on UserContext (Define correctly) - ${value}`)
  },
}

const Context = React.createContext(defaultContextValues)

export const UserContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [user, setCurrentUser] = useState<UserType>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [userId, setUserId] = useLocalStorage('userId', '-1')

  const setUser = useCallback((value: UserType) => {
    setCurrentUser(value)
    setUserId(value.id)
  }, [])

  const values = { user, setUser, loading, setLoading, userId }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

UserContextProvider.context = Context
export default UserContextProvider
