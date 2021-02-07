import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import { WalletContextProvider } from '../../context/WalletContext'

import LayoutMain from '../LayoutMain/LayoutMain'
import WalletOverview from './Wallet/WalletOverview'
import { useTranslation } from 'react-i18next'

const Wallet: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <>
      <LayoutMain>
        <WalletContextProvider>
          <div className="content-grid">
            <div className="grid grid-2-8-2">
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
              </div>

              <WalletOverview />
            </div>
          </div>
        </WalletContextProvider>
      </LayoutMain>
    </>
  )
}

export default Wallet
