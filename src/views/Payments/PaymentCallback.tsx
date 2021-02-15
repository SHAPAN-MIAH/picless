import React, { FunctionComponent } from 'react'
import useRouter from '../../hooks/useRouter'

import LayoutMain from '../LayoutMain/LayoutMain'

type CallbackType = 'WALLET' | 'SUBSCRIPTION'

const PaymentCallback: FunctionComponent<{}> = () => {
  const router = useRouter()

  const callbackType = router.pathname.includes('wallet') ? 'WALLET' : 'SUBSCRIPTION'
  const paymentIntent = (router.query as { payment_intent: string }).payment_intent

  console.log(router)

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid grid-2-8-2">
            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <h2 className="section-title">Payment Callback</h2>
                </div>
              </div>
              <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content">
                    <form className="form">
                      <h1 style={{ marginBottom: '50px' }}> Under Construction</h1>

                      <h2>Type </h2>
                      <div style={{ marginBottom: '50px' }}>{callbackType}</div>
                      <h2>Payment Intent</h2>
                      <div style={{ marginBottom: '20px' }}>{paymentIntent}</div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default PaymentCallback
