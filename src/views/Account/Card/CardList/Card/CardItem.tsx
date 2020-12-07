import React, { FunctionComponent } from 'react'
import { CardType } from '../../../../../types/PaymentTypes.d'
import ProviderIconCard from '../../../../../components/Common/ProviderIconCard'
import Popup from 'reactjs-popup'

const CardItem: FunctionComponent<{ card: CardType }> = (props) => {
  const { card } = props

  return (
    <>
      <div className="table-row medium">
        <div className="table-column padded">
          <div className="product-preview tiny">
            <div style={{ fontSize: '40px', marginRight: '20px' }}>
              <ProviderIconCard provider={card.brand} />
            </div>

            <div className="product-preview-info" style={{ paddingTop: '24px' }}>
              <p className="product-preview-title">
                {card.brand} ending in {card.last4}
              </p>
            </div>
          </div>
        </div>

        <div className="table-column padded">
          <p className="table-title">{card.cardholderName}</p>
        </div>

        <div className="table-column padded">
          <p className="table-title">
            {card.expMonth} / {card.expYear}
          </p>
        </div>

        <div className="table-column padded">
          <p className="table-title">
            <Popup
              trigger={<span className="highlighted">Billing address</span>}
              position={['top center', 'bottom right', 'bottom left']}
              closeOnDocumentClick
            >
              <div style={{ margin: '10px' }}>
                <h5 style={{ marginBottom: '10px' }}>Billing Address</h5>
                <h6 style={{ margin: '5px' }}>{card.cardholderName}</h6>
                <p style={{ margin: '5px' }}>{card.addressLine1}</p>
                {/* <h6>{card.addressLine2 || ''}</h6> */}
                <p style={{ margin: '5px' }}>{`${card.addressCity}, ${card.addressState}, MISSING ZIP CODE`}</p>
                <p style={{ margin: '5px' }}>{card.country}</p>
              </div>
            </Popup>
          </p>
        </div>

        <div className="table-column padded-right">
          <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
            <div className="action-request decline" title="Delete">
              <svg className="action-request-icon icon-cross">
                <use xlinkHref="#svg-cross" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardItem
