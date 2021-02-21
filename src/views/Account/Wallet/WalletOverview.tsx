import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import MovementList from '../Movements/MovementsList'
import PaymentMethods from '../PaymentMethods'
import OverviewHeader from './OverviewHeader'
import AddFounds from '../AddFounds'

const WalletOverview: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="grid grid-half">
        <div className="grid-column" style={{ maxHeight: '515px' }}>
          <OverviewHeader />

          <AddFounds />
        </div>
        <div className="grid-column" style={{ maxHeight: '515px' }}>
          <PaymentMethods />
        </div>
      </div>
      <div className="account-hub-content">
        <div className="section-header">
          <div className="section-header-info">
            <p className="section-pretitle">{t('wallet.movements')}</p>

            <h2 className="section-title">{t('wallet.lastMovement')}</h2>
          </div>
        </div>

        <div className="table-wrap" data-simplebar>
          <div className="table table-sales">
            <div className="table-header">
              <div className="table-header-column">
                <p className="table-header-title">Date</p>
              </div>

              <div className="table-header-column padded-left">
                <p className="table-header-title">Description</p>
              </div>

              <div className="table-header-column centered padded">
                <p className="table-header-title">Type</p>
              </div>

              <div className="table-header-column centered padded">
                <p className="table-header-title">Card</p>
              </div>

              <div className="table-header-column centered padded">
                <p className="table-header-title">Price</p>
              </div>

              <div className="table-header-column padded-left" />
            </div>

            <div className="table-body same-color-rows">
              <MovementList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WalletOverview
