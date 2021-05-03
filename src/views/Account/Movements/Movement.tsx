import React, { FunctionComponent } from 'react'

import { unixTimestampToDate } from '../../../utils/Helpers'

import { MovementType } from '../../../types/PaymentTypes'

type MovementProps = {
  item: MovementType
}

const Movement: FunctionComponent<MovementProps> = (props) => {
  const { item } = props

  return (
    <>
      <div className="table-row micro">
        <div className="table-column">
          <p className="table-text">
            <span className="light">{unixTimestampToDate(item.created, 'MM/DD/YYYY HH:mm')}</span>
          </p>
        </div>

        <div className="table-column padded-left">
          <a className="table-link" href="marketplace-product.html">
            <span className="highlighted">{item.description || 'N/A'}</span>
          </a>
        </div>

        <div className="table-column centered padded">
          <p className="table-title">{item.objectType}</p>
        </div>

        <div className="table-column centered padded">
          <p className="table-text">
            <span className="light">{`***${item.card.last4}`}</span>
          </p>
        </div>

        <div className="table-column centered padded">
          <p className="table-title">{`${item.currency} ${item.amount > 0 ? item.amount : item.amountRefunded}`}</p>
        </div>

        {item.amount > 0 && (
          <div className="table-column padded-left">
            <div className="percentage-diff-icon-wrap positive">
              <svg className="percentage-diff-icon icon-plus-small">
                <use xlinkHref="#svg-plus-small" />
              </svg>
            </div>
          </div>
        )}

        {item.amountRefunded > 0 && (
          <div className="table-column padded-left">
            <div className="percentage-diff-icon-wrap negative">
              <svg className="percentage-diff-icon icon-minus-small">
                <use xlinkHref="#svg-minus-small" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Movement
