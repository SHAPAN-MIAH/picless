import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import LayoutMain from '../LayoutMain/LayoutMain'
import AccountSidebar from './AccountSidebar/AccountSidebar'

const Movements: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
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
                          <input type="text" id="statement-from-date" name="statement_from_date" value="02/22/2019" />
                        </div>

                        <svg className="form-input-icon icon-events">
                          <use xlinkHref="#svg-events" />
                        </svg>
                      </div>

                      <div className="form-input-decorated">
                        <div className="form-input small active">
                          <label htmlFor="statement-to-date">To Date</label>
                          <input type="text" id="statement-to-date" name="statement_to_date" value="11/14/2019" />
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

                <div className="section-filters-bar-actions">
                  <p className="button secondary">Download Statement</p>
                </div>
              </div>

              <div className="table-wrap" data-simplebar>
                <div className="table table-sales">
                  <div className="table-header">
                    <div className="table-header-column">
                      <p className="table-header-title">Date</p>
                    </div>

                    <div className="table-header-column padded-left">
                      <p className="table-header-title">Item</p>
                    </div>

                    <div className="table-header-column centered padded">
                      <p className="table-header-title">Type</p>
                    </div>

                    <div className="table-header-column centered padded">
                      <p className="table-header-title">Code</p>
                    </div>

                    <div className="table-header-column centered padded">
                      <p className="table-header-title">Price</p>
                    </div>

                    <div className="table-header-column centered padded">
                      <p className="table-header-title">Cut</p>
                    </div>

                    <div className="table-header-column centered padded">
                      <p className="table-header-title">Earning</p>
                    </div>

                    <div className="table-header-column padded-left" />
                  </div>

                  <div className="table-body same-color-rows">
                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 15th, 2019</span>
                        </p>
                      </div>

                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">Pixel Diamond Gaming Magazine</span>
                        </a>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">Sale</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK1287</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$26</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">50%</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$13</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap positive">
                          <svg className="percentage-diff-icon icon-plus-small">
                            <use xlinkHref="#svg-plus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 15th, 2019</span>
                        </p>
                      </div>

                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">Twitch Stream UI Pack</span>
                        </a>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">Sale</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK1364</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$12</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">50%</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$6</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap positive">
                          <svg className="percentage-diff-icon icon-plus-small">
                            <use xlinkHref="#svg-plus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 14th, 2019</span>
                        </p>
                      </div>

                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">Pixel Diamond Gaming Magazine</span>
                        </a>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">Sale</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK7638</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$26</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">50%</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$13</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap positive">
                          <svg className="percentage-diff-icon icon-plus-small">
                            <use xlinkHref="#svg-plus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 14th, 2019</span>
                        </p>
                      </div>

                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">Twitch Stream UI Pack</span>
                        </a>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">Sale</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK7285</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$12</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">50%</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$6</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap positive">
                          <svg className="percentage-diff-icon icon-plus-small">
                            <use xlinkHref="#svg-plus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 14th, 2019</span>
                        </p>
                      </div>

                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">Twitch Stream UI Pack</span>
                        </a>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">Sale</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK9673</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$12</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">50%</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$6</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap positive">
                          <svg className="percentage-diff-icon icon-plus-small">
                            <use xlinkHref="#svg-plus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 12th, 2019</span>
                        </p>
                      </div>

                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">Gaming Coin Badges Pack</span>
                        </a>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">Purchase</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK2589</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$6</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">-</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">-$6</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap negative">
                          <svg className="percentage-diff-icon icon-minus-small">
                            <use xlinkHref="#svg-minus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 9th, 2019</span>
                        </p>
                      </div>

                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">People Illustrations Pack 01</span>
                        </a>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">Purchase</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK3146</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$5</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">-</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">-$5</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap negative">
                          <svg className="percentage-diff-icon icon-minus-small">
                            <use xlinkHref="#svg-minus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 9th, 2019</span>
                        </p>
                      </div>

                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">Pixel Diamond Gaming Magazine</span>
                        </a>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">Sale</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK4577</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$26</p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">50%</span>
                        </p>
                      </div>

                      <div className="table-column centered padded">
                        <p className="table-title">$13</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap positive">
                          <svg className="percentage-diff-icon icon-plus-small">
                            <use xlinkHref="#svg-plus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="table-row micro">
                      <div className="table-column">
                        <p className="table-text">
                          <span className="light">Nov 9th, 2019</span>
                        </p>
                      </div>
                      <div className="table-column padded-left">
                        <a className="table-link" href="marketplace-product.html">
                          <span className="highlighted">Emerald Dragon Digital Marketplace</span>
                        </a>
                      </div>
                      <div className="table-column centered padded">
                        <p className="table-title">Sale</p>
                      </div>
                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">VK6379</span>
                        </p>
                      </div>
                      <div className="table-column centered padded">
                        <p className="table-title">$24</p>
                      </div>
                      <div className="table-column centered padded">
                        <p className="table-text">
                          <span className="light">50%</span>
                        </p>
                      </div>
                      <div className="table-column centered padded">
                        <p className="table-title">$12</p>
                      </div>

                      <div className="table-column padded-left">
                        <div className="percentage-diff-icon-wrap positive">
                          <svg className="percentage-diff-icon icon-plus-small">
                            <use xlinkHref="#svg-plus-small" />
                          </svg>
                        </div>
                      </div>
                    </div>
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
      </LayoutMain>
    </>
  )
}

export default Movements
