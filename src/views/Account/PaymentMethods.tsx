import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import AccountSidebar from './AccountSidebar/AccountSidebar'
import LayoutMain from '../LayoutMain/LayoutMain'

import CardList from './Card/CardList/CardList'
import WalletContextProvider from '../../context/WalletContext'

const PaymentMethods: FunctionComponent<{}> = () => {
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

                    <h2 className="section-title">{t('wallet.paymentMethodSubTitle')}</h2>
                  </div>

                  <div className="section-header-actions">
                    <Link className="section-header-action" to="/wallet/payments/add-card">
                      + {t('wallet.addNewCard')}
                    </Link>
                  </div>
                </div>

                {/* TABLE CARDS */}

                <CardList />
              </div>
            </div>
          </div>
        </WalletContextProvider>
      </LayoutMain>
    </>
  )
}

export default PaymentMethods
