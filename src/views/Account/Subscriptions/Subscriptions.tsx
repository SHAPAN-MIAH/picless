import React, { FunctionComponent } from 'react'
import { SubscriptionsContextProvider } from '../../../context/SubscriptionsContext'

import SubscriptionList from './SubscriptionList/SubscriptionList'

const Subscriptions: FunctionComponent<{}> = () => {
  return (
    <>
      <SubscriptionsContextProvider>
        <div className="content-grid">
          <section className="section">
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
