import React, { ReactNode, useState } from 'react'
import { LiveType } from 'types/StreamingType'
import { NotificationType } from '../types/NotificationType'

interface LivesContextProps {
  currentLives: LiveType[]
  setCurrentLives: React.Dispatch<React.SetStateAction<LiveType[]>>
}

const defaultContextValues: LivesContextProps = {
  currentLives: [],
  setCurrentLives: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const LivesContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [currentLives, setCurrentLives] = useState<LiveType[]>([])

  const values = { currentLives, setCurrentLives }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

LivesContextProvider.context = Context
export default LivesContextProvider
