import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import useSubscription from '../../../../hooks/useSubscription'
import Alert from '../../../../components/Common/Alerts/Alerts'
import { SubscriptorListType } from '../../../../types/UserType.d'
import Subscriptor from './Subscriptor'

const noSubscriptorsMessage = 'Nothing was found'

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

type SubscriptionListProps = {}

const SubscriptionList: FunctionComponent<SubscriptionListProps> = () => {
  const { subscriptions, getSubscriptions, loading } = useSubscription()

  const [page, setPage] = useState<number>(0)

  const getSubscriptionList = useCallback(() => {
    getSubscriptions(page).then(() => {
      setPage(page + 1)
    })
  }, [getSubscriptions, setPage, page])

  useEffect(() => {
    getSubscriptionList()
  }, [])

  return (
    <>
      {!loading && subscriptions.length === 0 && (
        <Alert alertType="PRIMARY" message={noSubscriptorsMessage} style={{ width: '100%', textAlign: 'center' }} />
      )}

      {subscriptions.length > 0 && (
        <InfiniteScroll dataLength={subscriptions.length} next={getSubscriptionList} hasMore loader={LoaderDiv}>
          {subscriptions.map((subscriptor: SubscriptorListType) => {
            return <Subscriptor key={subscriptor.id} subscriptor={subscriptor} />
          })}
        </InfiniteScroll>
      )}
    </>
  )
}

export default SubscriptionList
