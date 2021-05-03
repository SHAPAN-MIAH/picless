import React, { FunctionComponent } from 'react'

import CardList from './Card/CardList/CardList'

const PaymentMethods: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="account-hub-content">
        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">My cards</p>
            <CardList />
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentMethods
