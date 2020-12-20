import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import WalletContextProvider from '../../context/WalletContext'

import LayoutMain from '../LayoutMain/LayoutMain'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import MovementList from './Movements/MovementsList'
import OverviewHeader from './Wallet/OverviewHeader'

const WalletOverview: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <>
      <LayoutMain>
        <WalletContextProvider>
          <div className="content-grid">
            <div className="grid grid-3-9">
              <AccountSidebar />

              <div className="account-hub-content">
                <div className="section-header">
                  <div className="section-header-info">
                    <p className="section-pretitle">{t('wallet.title')}</p>

                    <h2 className="section-title">{t('wallet.subTitle')}</h2>
                  </div>
                </div>

                <OverviewHeader />

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
                {/* <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content"> 
                  
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </WalletContextProvider>
      </LayoutMain>
    </>
  )
}

export default WalletOverview
