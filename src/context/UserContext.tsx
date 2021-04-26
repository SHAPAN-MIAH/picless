import React, { ReactNode, useCallback, useState } from 'react'
import { UserType, UserSettingsType } from '../types/UserType'
import useLocalStorage from '../hooks/commons/useLocalStorage'

interface UserContextProps {
  user: UserType
  loading: boolean
  userId: string
  settings: UserSettingsType
  setUser: (value: UserType) => void
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setSettings: React.Dispatch<React.SetStateAction<UserSettingsType>>
}

const defaultContextValues: UserContextProps = {
  user: {},
  loading: false,
  userId: '-1',
  settings: {},
  setUser: (value: any): void => {
    console.warn(`Error on UserContext (Define correctly) - ${value}`)
  },
  setLoading: (value: any): void => {
    console.warn(`Error on UserContext (Define correctly) - ${value}`)
  },
  setSettings: (value: any): void => {
    console.warn(`Error on UserContext (Define correctly) - ${value}`)
  },
}

const Context = React.createContext(defaultContextValues)

export const UserContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [user, setCurrentUser] = useState<UserType>({})
  const [settings, setSettings] = useState<UserSettingsType>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [userId, setUserId] = useLocalStorage('userId', '-1')

  const setUser = useCallback((value: UserType) => {
    setCurrentUser(value)
    setUserId(value.id)
  }, [])

  const values = { user, setUser, loading, setLoading, userId, settings, setSettings }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

UserContextProvider.context = Context
export default UserContextProvider
