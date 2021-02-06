import React, { ReactNode, useState } from 'react'
import { UserProfileType } from '../types/UserType.d'

interface UserProfileContextProps {
  user: UserProfileType
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfileType>>
}

const defaultContextValues: UserProfileContextProps = {
  user: {} as UserProfileType,
  setUserProfile: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const UserProfileContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [user, setUserProfile] = useState<UserProfileType>({} as UserProfileType)

  const values = { user, setUserProfile }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

UserProfileContextProvider.context = Context
export default UserProfileContextProvider
