import { useCallback, useContext, useState } from 'react'
import {
  CardType,
  MovementType,
  ServiceMovementType,
} from '../types/PaymentTypes'
import WalletContext from '../context/WalletContext'
import PaymentService from '../services/PaymentService'
import toast from 'react-hot-toast'

enum FoundReturn {
  Succeeded = 'SUCCEEDED',
  Redirect = 'REDIRECT',
  Error = 'ERROR',
}

const useWallet = () => {
  const { cards, setCards, defaultCard, setDefaultCard, balance, setBalance } = useContext(WalletContext.context)

  const [loading, setLoading] = useState(false)
  const [movements, setMovements] = useState<MovementType[]>([])

  const getMovements = useCallback((s: AbortSignal) => {
    setLoading(true)
    PaymentService.getMovements(s).then((data: ServiceMovementType) => {
      setMovements(data.list)
      setLoading(false)
    })
  }, [])

  const updateCards = useCallback(() => {
    setLoading(true)

    PaymentService.getCards().then((cardList: CardType[]) => {
      setCards(cardList)
      setLoading(false)
    })
  }, [setCards, setLoading])

  const removeCard = useCallback(
    (cardId: string) => {
      PaymentService.removeCard(cardId).then((data: any) => {
        if (data.code === '0') {
          updateCards()
          toast.success('Remove card successfully')
        }
      })
    },
    [updateCards]
  )

  const getDefaultCard = useCallback(() => {
    PaymentService.getDefaultCard().then((data: any) => {
      setDefaultCard(data)
    })
  }, [setDefaultCard])

  const getCards = useCallback(async (signal) => {
    return PaymentService.getCards(signal).then((cardList: CardType[]) => {
      setCards(cardList)
    })
  }, [])

  const changeDefaultCard = useCallback(
    (cardId: string) => {
      PaymentService.changeDefaultCard(cardId).then((data: any) => {
        if (data.code === '0') {
          getDefaultCard()
          toast.success('changed default card successfully')
        }
      })
    },
    [getDefaultCard]
  )



  const confirmPayment = useCallback((paymentIntent: string, type: string,  postId: number, userName: string, paymentIntentClientSecret: string, sourceRedirectSlug: string) => {
    return new Promise<string>((resolve, reject) => {
      PaymentService.confirmPayment(paymentIntent, type, postId, userName, paymentIntentClientSecret, sourceRedirectSlug).then((data: any) => {
        if (data.code === '0' && data.message === 'OK') {
          resolve('SUCCESS')
        } else {
          reject(new Error('Error confirming the payment'))
        }
      })
    })
  }, [])

  const getPlanOptions = useCallback((userName: string, signal: AbortSignal) => {
    return PaymentService.getPlanOptions(userName || '', signal)
  }, [])

  return {
    loading,
    getCards,
    cards,
    defaultCard,
    movements,
    getMovements,
    changeDefaultCard,
    confirmPayment,
    removeCard,
    getDefaultCard,
    updateCards,
    getPlanOptions,
  }
}

export default useWallet
