import React, { FunctionComponent } from 'react'
import Loader from 'react-loader-spinner'
import Alert from '../../../../components/Common/Alerts/Alerts'
import { SubscriptorListType } from '../../../../types/UserType.d'
import Subscriptor from './Subscriptor'

const noSubscriptorsMessage = 'Nothing was found'

type SubscriptionListProps = { loading: boolean; subscriptions: SubscriptorListType[] }
const SubscriptionList: FunctionComponent<SubscriptionListProps> = (props) => {
  const { loading, subscriptions } = props

  if (loading) {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {loading && <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />}
        </div>
      </>
    )
  }

  if (subscriptions.length === 0) {
    return (
      <>
        <Alert alertType="PRIMARY" message={noSubscriptorsMessage} style={{ width: '100%', textAlign: 'center' }} />
      </>
    )
  }

  return (
    <>
      {subscriptions.map((subscriptor: SubscriptorListType) => {
        return <Subscriptor key={subscriptor.id} subscriptor={subscriptor} />
      })}
    </>
  )
}

export default SubscriptionList
