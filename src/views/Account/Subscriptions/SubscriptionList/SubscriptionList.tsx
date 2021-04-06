import useSubscription from 'hooks/useSubscription'
import React, { FunctionComponent, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import Alert from '../../../../components/Common/Alerts/Alerts'
import { SubscriptorListType } from '../../../../types/UserType.d'
import Subscriptor from './Subscriptor'

const noSubscriptorsMessage = 'Nothing was found'

type SubscriptionListProps = {}
const SubscriptionList: FunctionComponent<SubscriptionListProps> = () => {
  const { subscriptions, loading } = useSubscription()

  useEffect(() => {
    console.log(subscriptions)
    console.log('asdfasdfasdfasdf')
  }, [subscriptions])

  return (
    <>
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {loading && <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />}
        </div>
      )}

      {subscriptions.length === 0 && (
        <Alert alertType="PRIMARY" message={noSubscriptorsMessage} style={{ width: '100%', textAlign: 'center' }} />
      )}

      {subscriptions.map((subscriptor: SubscriptorListType) => {
        return <Subscriptor key={subscriptor.id} subscriptor={subscriptor} />
      })}
    </>
  )
}

export default SubscriptionList
