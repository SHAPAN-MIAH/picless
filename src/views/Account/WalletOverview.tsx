import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import LayoutMain from '../LayoutMain/LayoutMain'
import AccountSidebar from './AccountSidebar/AccountSidebar'

const WalletOverview: FunctionComponent<{}> = () => {
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

                  <h2 className="section-title">{t('wallet.subTitle')}</h2>
                </div>
              </div>

              <div className="grid-column">
                <div className="earning-stat-box full">
                  <div className="earning-stat-box-info">
                    <div className="earning-stat-box-icon-wrap stat-balance">
                      <svg className="earning-stat-box-icon icon-wallet">
                        <use xlinkHref="#svg-wallet" />
                      </svg>
                    </div>

                    <p className="earning-stat-box-title">
                      250.32 <span className="currency">U$D</span>
                    </p>

                    <p className="earning-stat-box-text">Account Balance</p>
                  </div>

                  <div className="user-stats">
                    <div className="user-stat big">
                      <a href="#/" className="user-stat-title">
                        <span className="highlighted">Manage</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

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
                          <span className="light">Nov 4th, 2019</span>
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
                          <span className="light">VK3345</span>
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
              {/* <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content"> 
                  
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default WalletOverview
