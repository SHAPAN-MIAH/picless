import React, { FunctionComponent } from 'react'

import useWallet from '../../../hooks/useWallet'

const OverviewHeader: FunctionComponent<{}> = () => {
  const { currentBalance } = useWallet()

  return (
    <>
      <div className="grid-column">
        <div className="earning-stat-box full">
          <div className="earning-stat-box-info">
            <div className="earning-stat-box-icon-wrap stat-balance">
              <svg className="earning-stat-box-icon icon-wallet">
                <use xlinkHref="#svg-wallet" />
              </svg>
            </div>

            <p className="earning-stat-box-title">
              {currentBalance} <span className="currency">EUR</span>
            </p>

            <p className="earning-stat-box-text">Account Balance</p>
          </div>

          <div className="user-stats">
            <div className="user-stat big">
              <a href="/wallet/payments/add-founds" className="user-stat-title">
                <span className="highlighted">Add Founds</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OverviewHeader
