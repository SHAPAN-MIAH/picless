import React, { ReactNode, useState } from 'react'
import { CardType } from '../types/PaymentTypes.d'

interface WalletContextProps {
  cards: CardType[]
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}

const defaultContextValues: WalletContextProps = {
  cards: [] as CardType[],
  setCards: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const WalletContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [cards, setCards] = useState<CardType[]>([])

  return <Context.Provider value={{ cards, setCards }}>{children}</Context.Provider>
}
WalletContextProvider.context = Context
export default WalletContextProvider
