import { useCallback, useContext, useEffect, useState } from 'react'
import PaymentService from '../services/PaymentService'

import WalletContext from '../context/WalletContext'
import { CardType, MovementType, ServiceMovementType } from '../types/PaymentTypes.d'

const useWallet = () => {
  const { cards, setCards, defaultCard, setDefaultCard, balance, setBalance } = useContext(WalletContext.context)

  const [loading, setLoading] = useState(false)
  const [movements, setMovements] = useState<MovementType[]>([])

  useEffect(() => {
    if (!cards || cards.length === 0) {
      setLoading(true)

      PaymentService.getCards().then((cardList: CardType[]) => {
        setCards(cardList)
        setLoading(false)
      })

      PaymentService.getDefaultCard().then((data: any) => {
        setDefaultCard(data)
      })

      PaymentService.getBalance().then((data: any) => {
        if (data.code === 0) setBalance(parseFloat(data.value))
      })
    }
  }, [])

  const addFoundsToWallet = useCallback((amount: number, description: string) => {
    PaymentService.addCreditToWallet(amount, 'EUR', description)
  }, [])

  const getMovements = useCallback(() => {
    setLoading(true)
    PaymentService.getMovements().then((data: ServiceMovementType) => {
      setMovements(data.list)
      setLoading(false)
    })
  }, [])

  const removeCard = useCallback((cardId: string) => {
    PaymentService.removeCard(cardId).then((data: any) => {
      if (data.code === '0') {
        updateCards()
        alert('Remove card successfully')
      }
    })
  }, [])

  const changeDefaultCard = useCallback((cardId: string) => {
    PaymentService.changeDefaultCard(cardId).then((data: any) => {
      if (data.code === '0') {
        getDefaultCard()
        alert('changed default card successfully')
      }
    })
  }, [])

  const getDefaultCard = useCallback(() => {
    PaymentService.getDefaultCard().then((data: any) => {
      setDefaultCard(data)
    })
  }, [])

  const updateCards = useCallback(() => {
    setLoading(true)

    PaymentService.getCards().then((cardList: CardType[]) => {
      setCards(cardList)
      setLoading(false)
    })
  }, [])

  const updateBalance = useCallback(() => {
    PaymentService.getBalance().then((data: any) => {
      if (data.code === 0) setBalance(parseFloat(data.value))
    })
  }, [])

  return {
    loading,
    cards,
    defaultCard,
    currentBalance: balance,
    movements,
    getMovements,
    addFounds: addFoundsToWallet,
    removeCard,
    changeDefaultCard,
    updateCards,
    updateBalance,
  }
}

export default useWallet
