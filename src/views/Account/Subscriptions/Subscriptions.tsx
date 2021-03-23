import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import UserService from '../../../services/UserService'
import { ServiceSubscriptorListType, SubscriptorListType } from '../../../types/UserType.d'
import SubscriptionList from './SubscriptionList/SubscriptionList'

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const noSubscriptions = 'Nothing to show'

const Subscriptions: FunctionComponent<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [subscriptions, setSubscriptions] = useState<SubscriptorListType[]>([])
  const [page, setPage] = useState<number>(0)

  const getSubscriptions = useCallback(() => {
    setLoading(true)

    UserService.getSubscriptions(page)
      .then((data: ServiceSubscriptorListType) => {
        setPage(page + 1)
        setSubscriptions(data.suscribers)
      })
      .catch(() => {
        toast.error('Error loading data')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    getSubscriptions()
  }, [])

  return (
    <>
      <div className="content-grid">
        <section className="section">
          <div className="section-header">
            <div className="section-header-info">
              <p className="section-pretitle">Subscriptions</p>

              <h2 className="section-title">My Subscriptions</h2>
            </div>
          </div>

          {/* <HeaderFilter /> */}

          <div className="grid">
            {subscriptions.length > 9 ? (
              <InfiniteScroll dataLength={subscriptions.length} next={getSubscriptions} hasMore loader={LoaderDiv}>
                <SubscriptionList loading={loading} subscriptions={subscriptions} />
              </InfiniteScroll>
            ) : (
              <SubscriptionList loading={loading} subscriptions={subscriptions} />
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Subscriptions
