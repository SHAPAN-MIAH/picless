import ButtonWithLoader from 'components/Common/ButtonWithLoader'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useRouter from '../../hooks/commons/useRouter'

import useWallet from '../../hooks/useWallet'

const CallbackType = ['unblock', 'tip', 'suscription']

const PaymentCallback: FunctionComponent<{}> = () => {
  const router = useRouter()
  const { confirmPayment } = useWallet()

  const type = CallbackType.find((item) => router.pathname.includes(item))

  const parameters = router.query as {
    id: string
    userName: string
    payment_intent: string
    payment_intent_client_secret: string
    source_redirect_slug: string
  }
  const paymentIntent = parameters.payment_intent
  const paymentIntentClientSecret = parameters.payment_intent_client_secret
  const sourceRedirectSlug = parameters.source_redirect_slug
  const userName = parameters.userName
  const postId = Number(parameters.id) || 0

  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false)
  const [paymentError, setPaymentError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if (paymentIntent) {
      confirmPayment(paymentIntent, type || '', postId, userName, paymentIntentClientSecret, sourceRedirectSlug)
        .then((data: any) => {
          debugger
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

  const goToPost = () => {
    setTimeout(() => {
      router.history.push(`/u/${userName}/post/${postId}`)
    }, 1000)
  }

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
                    <h2>Type </h2>
                    <div style={{ marginBottom: '50px' }}>{type}</div>
                    <h2>Payment Intent</h2>
                    <div style={{ marginBottom: '50px' }}>{paymentIntent}</div>

                    {loading && <h1>Loading ...</h1>}

                    {paymentSuccess && <h1 style={{ color: 'green' }}> SUCCESS </h1>}
                    {paymentError && <h1 style={{ color: 'red' }}> ERROR </h1>}

                    {paymentSuccess && type === 'unblock' && (
                      <ButtonWithLoader type="button" className="small secondary" onClick={goToPost} showLoader={false}>
                        Go to post
                      </ButtonWithLoader>
                    )}
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
