import React, { ReactNode, useState } from 'react'

interface ApplicationContextProps {
  showMenu: boolean
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultContextValues: ApplicationContextProps = {
  showMenu: false,
  setShowMenu: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const ApplicationContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const values = { showMenu, setShowMenu }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

ApplicationContextProvider.context = Context
export default ApplicationContextProvider
