import { useCallback, useState } from 'react'
import PaymentService from '../services/PaymentService'

import { AddCardType } from '../types/PaymentTypes.d'

const useWallet = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const addCardHandler = useCallback((card: AddCardType) => {
    setIsLoading(true)

    PaymentService.addCard(card)
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setErrorMessage(JSON.stringify(err))
      })
  }, [])

  return { addCard: addCardHandler, isLoading, errorMessage }
}

export default useWallet
