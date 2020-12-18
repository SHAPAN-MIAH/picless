import React, { FunctionComponent, useState } from 'react'
import Loader from 'react-loader-spinner'
import Subscriptor from './Subscriptor'

const SubscriptionList: FunctionComponent<{}> = () => {
  const [loading, setLoading] = useState(false)

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
      {[1, 2, 3, 4, 5, 6].map((number: any) => {
        return <Subscriptor key={number} />
      })}
    </>
  )
}

export default SubscriptionList
