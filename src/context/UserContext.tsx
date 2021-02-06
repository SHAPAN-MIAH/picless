import React, { ReactNode, useState } from 'react'
import { UserType } from '../types/UserType.d'

interface UserContextProps {
  user: UserType
  loading: boolean
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultContextValues: UserContextProps = {
  user: {},
  loading: false,
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

  const [user, setUser] = useState<UserType>({})
  const [loading, setLoading] = useState<boolean>(false)

  const values = { user, setUser, loading, setLoading }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

UserContextProvider.context = Context
export default UserContextProvider
