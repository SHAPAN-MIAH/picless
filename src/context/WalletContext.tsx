import React, { ReactNode, useState } from 'react'
import { CardType, DefaultCardType } from '../types/PaymentTypes'

interface WalletContextProps {
  cards: CardType[]
  defaultCard: DefaultCardType | null
  balance: number
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
  setDefaultCard: React.Dispatch<React.SetStateAction<DefaultCardType | null>>
  setBalance: React.Dispatch<React.SetStateAction<number>>
}

const defaultContextValues: WalletContextProps = {
  cards: [] as CardType[],
  defaultCard: null,
  balance: 0,
  setCards: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  setDefaultCard: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  setBalance: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const WalletContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [cards, setCards] = useState<CardType[]>([])
  const [defaultCard, setDefaultCard] = useState<DefaultCardType | null>(null)
  const [balance, setBalance] = useState<number>(0)

  const values = { cards, setCards, defaultCard, setDefaultCard, balance, setBalance }

  return <Context.Provider value={values}>{children}</Context.Provider>
}
WalletContextProvider.context = Context
export default WalletContextProvider
