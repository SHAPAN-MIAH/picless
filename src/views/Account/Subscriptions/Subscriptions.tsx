import useSubscription from 'hooks/useSubscription'
import React, { FunctionComponent, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from 'react-loader-spinner'
import SubscriptionList from './SubscriptionList/SubscriptionList'

const LoaderDiv = (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const noSubscriptions = 'Nothing to show'

const Subscriptions: FunctionComponent<{}> = () => {
  const { subscriptions, getSubscriptions } = useSubscription()

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
            {/* {subscriptions.length > 9 ? (
              <InfiniteScroll dataLength={subscriptions.length} next={getSubscriptions} hasMore loader={LoaderDiv}>
                <SubscriptionList />
              </InfiniteScroll>
            ) : ( */}
            <SubscriptionList />
            {/* )} */}
          </div>
        </section>
      </div>
    </>
  )
}

export default Subscriptions
