import React, { FunctionComponent } from 'react'
import { SubscriptionsContextProvider } from '../../../context/SubscriptionsContext'

import SubscriptionList from './SubscriptionList/SubscriptionList'

const Subscriptions: FunctionComponent<{}> = () => {
  return (
    <>
      <SubscriptionsContextProvider>
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
              <SubscriptionList />
            </div>
          </section>
        </div>
      </SubscriptionsContextProvider>
    </>
  )
}

export default Subscriptions
