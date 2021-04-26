import React, { FunctionComponent, useEffect, useState } from 'react'
import useRouter from '../../hooks/commons/useRouter'

import useWallet from '../../hooks/useWallet'

type CallbackType = 'WALLET' | 'SUBSCRIPTION'

const PaymentCallback: FunctionComponent<{}> = () => {
  const router = useRouter()
  const { confirmPayment } = useWallet()
  const callbackType = router.pathname.includes('wallet') ? 'WALLET' : 'SUBSCRIPTION'
  const paymentIntent = (router.query as { payment_intent: string }).payment_intent

  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)
  const [paymentError, setPaymentError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if (paymentIntent) {
      confirmPayment(paymentIntent)
        .then((data: any) => {
          if (data === 'SUCCESS') {
            setPaymentSuccess(true)
            setPaymentError(false)
            setLoading(false)
          }
        })
        .catch((err) => {
          setPaymentSuccess(false)
          setPaymentError(true)
          setLoading(false)
        })
    } else {
      router.push('/error')
    }
  }, [])

  console.log(router)

  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
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
                    <div style={{ marginBottom: '50px' }}>{paymentIntent}</div>

                    {loading && <h1>Loading ...</h1>}

                    {paymentSuccess && <h1 style={{ color: 'green' }}> SUCCESS </h1>}
                    {paymentError && <h1 style={{ color: 'red' }}> ERROR </h1>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentCallback
