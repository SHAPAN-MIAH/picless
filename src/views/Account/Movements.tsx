import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import AccountSidebar from './AccountSidebar/AccountSidebar'
import MovementList from './Movements/MovementsList'

const Movements: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid grid-3-9">
          <AccountSidebar />

          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">{t('wallet.title')}</p>

                <h2 className="section-title">{t('wallet.myMovementsSubTitle')}</h2>
              </div>
            </div>

            <div className="section-filters-bar v6 v6-2">
              <div className="section-filters-bar-actions">
                <form className="form">
                  <div className="form-item split">
                    <div className="form-input-decorated">
                      <div className="form-input small active">
                        <label htmlFor="statement-from-date">From Date</label>
                        <input type="text" id="statement-from-date" name="statement_from_date" value="" />
                      </div>

                      <svg className="form-input-icon icon-events">
                        <use xlinkHref="#svg-events" />
                      </svg>
                    </div>

                    <div className="form-input-decorated">
                      <div className="form-input small active">
                        <label htmlFor="statement-to-date">To Date</label>
                        <input type="text" id="statement-to-date" name="statement_to_date" value="" />
                      </div>

                      <svg className="form-input-icon icon-events">
                        <use xlinkHref="#svg-events" />
                      </svg>
                    </div>

                    <button type="button" className="button primary">
                      <svg className="icon-magnifying-glass">
                        <use xlinkHref="#svg-magnifying-glass" />
                      </svg>
                    </button>
                  </div>
                </form>
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

            <div className="section-pager-bar-wrap align-right">
              <div className="section-pager-bar">
                <div className="section-pager">
                  <div className="section-pager-item active">
                    <p className="section-pager-item-text">01</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">02</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">03</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">04</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">05</p>
                  </div>

                  <div className="section-pager-item">
                    <p className="section-pager-item-text">06</p>
                  </div>
                </div>

                <div className="section-pager-controls">
                  <div className="slider-control left disabled">
                    <svg className="slider-control-icon icon-small-arrow">
                      <use xlinkHref="#svg-small-arrow" />
                    </svg>
                  </div>

                  <div className="slider-control right">
                    <svg className="slider-control-icon icon-small-arrow">
                      <use xlinkHref="#svg-small-arrow" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Movements
