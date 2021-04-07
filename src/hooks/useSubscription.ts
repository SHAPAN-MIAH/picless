import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import SubscriptionsContext from '../context/SubscriptionsContext'
import UserService from '../services/UserService'
import { ServiceSubscriptorListType } from '../types/UserType.d'
import useProfile from './useProfile'

const useSubscription = () => {
  const { subscriptions, setSubscriptions } = useContext(SubscriptionsContext.context)

  const { cancelSubscription } = useProfile({ disableMount: true })
  const [loading, setLoading] = useState<boolean>(false)

  const getSubscriptions = (page = 0) => {
    setLoading(true)

    return UserService.getSubscriptions(page)
      .then((data: ServiceSubscriptorListType) => {
        setSubscriptions([...data.suscribers])
      })
      .catch(() => {
        toast.error('Error loading data')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const cancel = (subscriptionId: number, userName: string) => {
    cancelSubscription(subscriptionId, userName).then(() => {
      getSubscriptions()
    })
  }

  return {
    loading,
    subscriptions,
    getSubscriptions,
    cancelSubscription: cancel,
  }
}

export default useSubscription
