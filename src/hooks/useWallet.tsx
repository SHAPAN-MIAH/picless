import { useContext, useEffect, useState } from 'react'
import PaymentService from '../services/PaymentService'

import WalletContext from '../context/WalletContext'
import { CardType } from '../types/PaymentTypes.d'

const useWallet = () => {
  const [loading, setLoading] = useState(false)

  const { cards, setCards } = useContext(WalletContext.context)

  useEffect(() => {
    setLoading(true)

    PaymentService.getCards().then((cardList: CardType[]) => {
      setCards(cardList)
      setLoading(false)
    })
  }, [])

  return {
    loading,
    cards,
  }
}
export default useWallet
