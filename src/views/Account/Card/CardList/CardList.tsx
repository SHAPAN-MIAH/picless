import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import useWallet from '../../../../hooks/useWallet'

import CardItem from './Card/CardItem'
import Alert from '../../../../components/Common/Alerts/Alerts'

import { CardType } from '../../../../types/PaymentTypes.d'

const CardList: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { cards, loading } = useWallet()
  return (
    <>
      {loading && <h4>Loading ...</h4>}
      {!loading && (
        <>
          {cards.length === 0 && (
            <Alert alertType="DANGER" style={{ width: '100%' }}>
              Please <Link to="/wallet/payments/add-card">{t('wallet.addNewCard')}</Link> to subscribe to other users or
              recharge your wallet.{' '}
            </Alert>
          )}

          {cards.length > 0 && (
            <div className="table-wrap" data-simplebar>
              <div className="table table-downloads split-rows">
                <div className="table-header">
                  <div className="table-header-column">
                    <p className="table-header-title">Provider</p>
                  </div>

                  <div className="table-header-column padded">
                    <p className="table-header-title">Name on card</p>
                  </div>

                  <div className="table-header-column padded">
                    <p className="table-header-title">Expires</p>
                  </div>

                  <div className="table-header-column"> </div>

                  <div className="table-header-column "> </div>
                </div>

                <div className="table-body same-color-rows">
                  {cards.map((card: CardType) => {
                    return <CardItem key={`id-${card.id}`} card={card} />
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CardList
