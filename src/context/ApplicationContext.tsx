import React, { ReactNode, useState } from 'react'
import { NotificationType } from '../types/NotificationType'

interface ApplicationContextProps {
  showMenu: boolean
  title: string
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
  setTitle: React.Dispatch<React.SetStateAction<string>>
  notifications: NotificationType[]
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>
}

const defaultContextValues: ApplicationContextProps = {
  showMenu: false,
  title: '',
  notifications: [],
  setShowMenu: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  setTitle: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  setNotifications: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const ApplicationContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(process.env.REACT_APP_WEBSITE_NAME || '')
  const [notifications, setNotifications] = useState<NotificationType[]>([])

  const values = { showMenu, setShowMenu, title, setTitle, notifications, setNotifications }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

ApplicationContextProvider.context = Context
export default ApplicationContextProvider
