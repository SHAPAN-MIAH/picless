import React, { ReactNode, useState } from 'react'
import { SubscriptorListType } from '../types/UserType'

interface SubscriptionsContextProps {
  subscriptions: SubscriptorListType[]
  setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptorListType[]>>
}

const defaultContextValues: SubscriptionsContextProps = {
  subscriptions: [],
  setSubscriptions: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const SubscriptionsContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [subscriptions, setSubscriptions] = useState<SubscriptorListType[]>([])

  const values = { subscriptions, setSubscriptions }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

SubscriptionsContextProvider.context = Context
export default SubscriptionsContextProvider
