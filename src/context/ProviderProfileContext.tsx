import React, { ReactNode, useState } from 'react'
import { UserProfileType } from '../types/UserType.d'

interface ProviderProfileContextProps {
  provider: UserProfileType
  setProvider: React.Dispatch<React.SetStateAction<UserProfileType>>
}

const defaultContextValues: ProviderProfileContextProps = {
  provider: {} as UserProfileType,
  setProvider: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const ProviderProfileContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [provider, setProvider] = useState<UserProfileType>({} as UserProfileType)

  const values = { provider, setProvider }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

ProviderProfileContextProvider.context = Context
export default ProviderProfileContextProvider
