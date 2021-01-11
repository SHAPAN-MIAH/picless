import React, { ReactNode, useState } from 'react'
import { UserType } from '../types/UserType.d'

interface UserContextProps {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
}

const defaultContextValues: UserContextProps = {
  user: {},
  setUser: (value: any): void => {
    console.warn(`Error on UserContext (Define correctly) - ${value}`)
  },
}

const Context = React.createContext(defaultContextValues)

export const UserContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [user, setUser] = useState<UserType>({})

  const values = { user, setUser }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

UserContextProvider.context = Context
export default UserContextProvider
