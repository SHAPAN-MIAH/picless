import { useCallback, useContext, useEffect, useState } from 'react'
import PaymentService from '../services/PaymentService'

import WalletContext from '../context/WalletContext'
import { CardType, DefaultCardType } from '../types/PaymentTypes.d'

const useWallet = () => {
  const { cards, setCards } = useContext(WalletContext.context)

  const [loading, setLoading] = useState(false)
  const [defaultCard, setDefaultCard] = useState<DefaultCardType | null>()

  useEffect(() => {
    setLoading(true)

    PaymentService.getCards().then((cardList: CardType[]) => {
      setCards(cardList)
      setLoading(false)
    })

    PaymentService.getDefaultCard().then((data: any) => {
      setDefaultCard(data)
    })
  }, [])

  const addCreditToWallet = useCallback((amount: number, description: string) => {
    PaymentService.addCreditToWallet(amount, 'EUR', description).then(() => {})
  }, [])

  return {
    loading,
    cards,
    defaultCard,
    addCredit: addCreditToWallet,
  }
}
export default useWallet
