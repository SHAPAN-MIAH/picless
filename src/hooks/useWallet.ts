import { useCallback, useContext, useState } from 'react'
import WalletContext from '../context/WalletContext'
import PaymentService from '../services/PaymentService'
import { CardType, MovementType, ServiceMovementType } from '../types/PaymentTypes.d'

enum FoundReturn {
  Succeeded = 'SUCCEEDED',
  Redirect = 'REDIRECT',
  Error = 'ERROR',
}

const useWallet = () => {
  const { cards, setCards, defaultCard, setDefaultCard, balance, setBalance } = useContext(WalletContext.context)

  const [loading, setLoading] = useState(false)
  const [movements, setMovements] = useState<MovementType[]>([])

  // const addFoundsToWallet = useCallback((amount: number, description: string, token: string) => {
  //   return PaymentService.addCreditToWallet(amount, 'USD', description, token).then((data: any) => {
  //     if (data.code === 0 && data.message === FoundReturn.Succeeded) {
  //       updateBalance()
  //     } else if (data.code === '0' && data.message !== 'redirect') {
  //       // redirecciono al path y luego de confirmar el iframe me llega a la url de destino, en esa pantalla hago post a payments/confirmpayment
  //       // con paymentIntent en el body, luego actualizo balance
  //     } else if (data.code === '1' && data.message === 'error') {
  //       alert('error')
  //     }
  //   })
  // }, [])

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
          alert('Remove card successfully')
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
          alert('changed default card successfully')
        }
      })
    },
    [getDefaultCard]
  )

  // const updateBalance = useCallback(() => {
  //   PaymentService.getBalance().then((data: any) => {
  //     if (data.code === 0) setBalance(parseFloat(data.value))
  //   })
  // }, [setBalance])

  const confirmPayment = useCallback((paymentIntent: string) => {
    return new Promise<string>((resolve, reject) => {
      PaymentService.confirmPayment(paymentIntent).then((data: any) => {
        if (data.code === 0) {
          // updateBalance()

          resolve('SUCCESS')
        } else {
          reject(new Error('Error confirming the payment'))
        }
      })
    })
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
  }
}

export default useWallet
