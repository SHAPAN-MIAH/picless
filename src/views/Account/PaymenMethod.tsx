import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import AccountSidebar from './AccountSidebar/AccountSidebar'
import LayoutMain from '../LayoutMain/LayoutMain'
import Alert from '../../components/Common/Alerts/Alerts'
import { Link } from 'react-router-dom'

const PaymentMethods: FunctionComponent<{}> = () => {
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

                  <h2 className="section-title">{t('wallet.paymentMethodSubTitle')}</h2>
                </div>

                <div className="section-header-actions">
                  <Link className="section-header-action" to="/wallet/payments/add-card">
                    + {t('wallet.addNewCard')}
                  </Link>
                </div>
              </div>

              <Alert alertType="DANGER" style={{ width: '100%' }}>
                Please <Link to="/wallet/payments/add-card">{t('wallet.addNewCard')}</Link> to subscribe to other users or
                recharge your wallet.{' '}
              </Alert>

              <div className="section-header">
                <div className="section-header-info">
                  <h2 className="section-title">{t('wallet.myCards')}</h2>
                </div>
              </div>

              <div className="notification-box-list">
                <div className="notification-box"> </div>

                <div className="notification-box">
                  <div className="user-status request">
                    <a className="user-status-avatar" href="profile-timeline.html">
                      <div className="user-avatar small no-outline">
                        <div className="user-avatar-content">
                          <div className="hexagon-image-30-32" data-src="img/avatar/14.jpg" />
                        </div>

                        <div className="user-avatar-progress">
                          <div className="hexagon-progress-40-44" />
                        </div>

                        <div className="user-avatar-progress-border">
                          <div className="hexagon-border-40-44" />
                        </div>

                        <div className="user-avatar-badge">
                          <div className="user-avatar-badge-border">
                            <div className="hexagon-22-24" />
                          </div>

                          <div className="user-avatar-badge-content">
                            <div className="hexagon-dark-16-18" />
                          </div>

                          <p className="user-avatar-badge-text">3</p>
                        </div>
                      </div>
                    </a>

                    <p className="user-status-title">
                      <a className="bold" href="profile-timeline.html">
                        Paul Lang
                      </a>
                    </p>

                    <p className="user-status-text small-space">2 friends in common</p>

                    <div className="action-request-list">
                      <p className="action-request accept with-text">
                        <svg className="action-request-icon icon-add-friend">
                          <use xlinkHref="#svg-add-friend" />
                        </svg>

                        <span className="action-request-text">Add Friend</span>
                      </p>

                      <div className="action-request decline">
                        <svg className="action-request-icon icon-remove-friend">
                          <use xlinkHref="#svg-remove-friend" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="notification-box">
                  <div className="user-status request">
                    <a className="user-status-avatar" href="profile-timeline.html">
                      <div className="user-avatar small no-outline">
                        <div className="user-avatar-content">
                          <div className="hexagon-image-30-32" data-src="img/avatar/11.jpg" />
                        </div>

                        <div className="user-avatar-progress">
                          <div className="hexagon-progress-40-44" />
                        </div>

                        <div className="user-avatar-progress-border">
                          <div className="hexagon-border-40-44" />
                        </div>

                        <div className="user-avatar-badge">
                          <div className="user-avatar-badge-border">
                            <div className="hexagon-22-24" />
                          </div>

                          <div className="user-avatar-badge-content">
                            <div className="hexagon-dark-16-18" />
                          </div>

                          <p className="user-avatar-badge-text">9</p>
                        </div>
                      </div>
                    </a>

                    <p className="user-status-title">
                      <a className="bold" href="profile-timeline.html">
                        Cassie May
                      </a>
                    </p>

                    <p className="user-status-text small-space">4 friends in common</p>

                    <div className="action-request-list">
                      <p className="action-request accept with-text">
                        <svg className="action-request-icon icon-add-friend">
                          <use xlinkHref="#svg-add-friend" />
                        </svg>

                        <span className="action-request-text">Add Friend</span>
                      </p>

                      <div className="action-request decline">
                        <svg className="action-request-icon icon-remove-friend">
                          <use xlinkHref="#svg-remove-friend" />
                        </svg>
                      </div>
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

export default PaymentMethods
