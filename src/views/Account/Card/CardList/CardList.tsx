import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Alert from '../../../../components/Common/Alerts/Alerts'
import useWallet from '../../../../hooks/useWallet'
import { CardType } from '../../../../types/PaymentTypes'
import CardItem from './Card/CardItem'

const CardList: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)

  const { cards, getCards, defaultCard, getDefaultCard, changeDefaultCard, removeCard } = useWallet()

  const controllerCancelable = new AbortController()
  const { signal } = controllerCancelable

  useEffect(() => {
    if (!cards || cards.length === 0) {
      setLoading(true)
      getCards(signal).then(() => {
        setLoading(false)

        getDefaultCard()
      })
    }

    return () => {
      controllerCancelable.abort()
    }
  }, [])

  const onRemoveCard = (cardId: string) => {
    removeCard(cardId)
  }

  const onChangeDefaultCard = (cardId: string) => {
    changeDefaultCard(cardId)
  }

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
            <div
              className="table-wrap"
              data-simplebar
              style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '415px', marginTop: '-10px' }}
            >
              <div className="table table-downloads split-rows" >
                <div className="table-body same-color-rows" >
                  
                    {cards.map((card: CardType) => {
                      const isDefault: boolean = card.id === defaultCard?.defaultCardId
                      return (
                        
                            <CardItem
                            key={`id-${card.id}`}
                            card={card}
                            isDefault={isDefault}
                            onChangeDefaultCard={onChangeDefaultCard}
                            onRemoveCard={onRemoveCard}
                          />
                        
                      )
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
