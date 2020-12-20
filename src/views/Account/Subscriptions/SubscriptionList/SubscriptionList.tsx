import React, { FunctionComponent, useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import { SubscriptorListType } from '../../../../types/UserType.d'

import UserService from '../../../../services/UserService'

import Subscriptor from './Subscriptor'

const SubscriptionList: FunctionComponent<{}> = () => {
  const [loading, setLoading] = useState(false)
  const [subscriptions, setSubscriptions] = useState<SubscriptorListType[]>([])

  useEffect(() => {
    setLoading(true)
    UserService.getSubscriptions().then((data: SubscriptorListType[]) => {
      setLoading(false)
      setSubscriptions(data)

      if (window.tpl) {
        window.tpl.load(['user-avatar', 'liquidify'])
      }
    })
  }, [])

  if (loading) {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {loading && <Loader type="TailSpin" color="#615dfa" height={25} width={25} visible />}
        </div>
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
