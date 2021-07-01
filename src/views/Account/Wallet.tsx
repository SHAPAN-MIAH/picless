import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { WalletContextProvider } from '../../context/WalletContext'

import WalletOverview from './Wallet/WalletOverview'

const Wallet: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <>
      <WalletContextProvider>
        <div className="content-grid">
          <div className="grid grid-2-8-2">
            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <p className="section-pretitle" style={{marginLeft: '5px'}}>{t('wallet.title')}</p>
                    
                  <h2 className="section-title" style={{marginLeft: '5px'}}>{t('wallet.paymentMethodSubTitle')}</h2>
                </div>

                <div className="section-header-actions" style={{marginRight: '5px'}}>
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
    </>
  )
}

export default Wallet
