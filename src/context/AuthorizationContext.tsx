import React, { ReactNode } from 'react'
import useLocalStorage from '../hooks/commons/useLocalStorage'

interface AuthorizationContextProps {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultContextValues: AuthorizationContextProps = {
  isAuthenticated: false,
  setIsAuthenticated: (value: any): void => {
    console.warn(`Error on UserContext (Define correctly) - ${value}`)
  },
}

const Context = React.createContext(defaultContextValues)

export const AuthorizationContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false)

  const values = { isAuthenticated, setIsAuthenticated }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

AuthorizationContextProvider.context = Context
export default AuthorizationContextProvider
