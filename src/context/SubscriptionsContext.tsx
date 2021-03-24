import React, { ReactNode, useState } from 'react'
import { SubscriptorListType } from '../types/UserType.d'

interface SubscriptionsContextProps {
  subscriptions: SubscriptorListType[]
  setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptorListType[]>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const defaultContextValues: SubscriptionsContextProps = {
  subscriptions: [],
  setSubscriptions: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  page: 0,
  setPage: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const SubscriptionsContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [subscriptions, setSubscriptions] = useState<SubscriptorListType[]>([])
  const [page, setPage] = useState<number>(0)

  const values = { subscriptions, setSubscriptions, page, setPage }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

SubscriptionsContextProvider.context = Context
export default SubscriptionsContextProvider
