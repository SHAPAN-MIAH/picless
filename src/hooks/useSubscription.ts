import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import SubscriptionsContext from '../context/SubscriptionsContext'
import PaymentService from '../services/PaymentService'
import UserService from '../services/UserService'
import { ServiceSubscriptorListType } from '../types/UserType.d'

const useSubscription = () => {
  const { subscriptions, setSubscriptions, page, setPage } = useContext(SubscriptionsContext.context)

  const [loading, setLoading] = useState<boolean>(false)

  const getSubscriptions = () => {
    setLoading(true)

    UserService.getSubscriptions(page)
      .then((data: ServiceSubscriptorListType) => {
        setPage(page + 1)
        setSubscriptions([...data.suscribers])
      })
      .catch(() => {
        toast.error('Error loading data')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const cancelSubscription = (subscriptionId: number, userName: string) => {
    const cancelPromise = PaymentService.cancelSubscription(subscriptionId)

    toast
      .promise(cancelPromise, {
        loading: 'Loading',
        success: `Cancel the subscription to the user ${userName}`,
        error: 'Error cancelling the subscription, please try again',
      })
      .then(() => {
        getSubscriptions()
      })
  }

  return {
    loading,
    page,
    subscriptions,
    getSubscriptions,
    cancelSubscription,
  }
}

export default useSubscription
