import React, { FunctionComponent, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { getAction } from '../../../redux/Auth/AuthSelectors'
import { signOut } from '../../../redux/Auth/AuthThunks'

const AccountSidebar: FunctionComponent<{}> = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const currentAction = useSelector(getAction)

  useEffect(() => {
    if (currentAction.action === 'SIGNOUT' && currentAction.status === 'FINISHED') {
      history.push('/')
    }
  })

  const logout = () => {
    dispatch(signOut())
  }

  return (
    <div>
      <div className="account-hub-sidebar">
        <div className="sidebar-box no-padding">
          <div className="sidebar-menu">
            <div className="sidebar-menu-item">
              <div className="sidebar-menu-header accordion-trigger-linked">
                <svg className="sidebar-menu-header-icon icon-settings">
                  <use xlinkHref="#svg-settings" />
                </svg>

                <div className="sidebar-menu-header-control-icon">
                  <svg className="sidebar-menu-header-control-icon-open icon-minus-small">
                    <use xlinkHref="#svg-minus-small" />
                  </svg>

                  <svg className="sidebar-menu-header-control-icon-closed icon-plus-small">
                    <use xlinkHref="#svg-plus-small" />
                  </svg>
                </div>

                <p className="sidebar-menu-header-title">{t('accountSidebar.accountTitle') /* Account */}</p>

                <p className="sidebar-menu-header-text">
                  {
                    t(
                      'accountSidebar.accountDescription'
                    ) /* Change your avatar and cover, update information email and more */
                  }
                </p>
              </div>

              <div className="sidebar-menu-body accordion-content-linked accordion-open">
                <Link className="sidebar-menu-link" to="/account/account-info">
                  {t('accountSidebar.accountInfo')}
                </Link>

                <Link className="sidebar-menu-link" to="/account/profile-info">
                  {t('accountSidebar.profileInfo')}
                </Link>

                <Link className="sidebar-menu-link" to="/account/account-devices">
                  {t('accountSidebar.accountdevices')}
                </Link>

                <Link className="sidebar-menu-link" to="/account/change-password">
                  {t('accountSidebar.changePassword')}
                </Link>

                <Link className="sidebar-menu-link" to="/account/settings">
                  {t('accountSidebar.settings')}
                </Link>

                <a className="sidebar-menu-link" href="/" onClick={logout}>
                  {t('accountSidebar.logout')}
                </a>
              </div>
            </div>

            <div className="sidebar-menu-item">
              <div className="sidebar-menu-header accordion-trigger-linked">
                <svg className="sidebar-menu-header-icon icon-settings">
                  <use xlinkHref="#svg-wallet" />
                </svg>

                <div className="sidebar-menu-header-control-icon">
                  <svg className="sidebar-menu-header-control-icon-open icon-minus-small">
                    <use xlinkHref="#svg-minus-small" />
                  </svg>

                  <svg className="sidebar-menu-header-control-icon-closed icon-plus-small">
                    <use xlinkHref="#svg-plus-small" />
                  </svg>
                </div>

                <p className="sidebar-menu-header-title">{t('accountSidebar.walletTitle')}</p>

                <p className="sidebar-menu-header-text">{t('accountSidebar.walletDescription')}</p>
              </div>

              <div className="sidebar-menu-body accordion-content-linked accordion-open">
                <Link className="sidebar-menu-link" to="/wallet/overview">
                  {t('accountSidebar.walletOverview')} {/* SHOW LAST MOVEMENTS */}
                </Link>

                <Link className="sidebar-menu-link" to="/wallet/payments">
                  {t('accountSidebar.walletPaymentMethods')}
                </Link>

                <Link className="sidebar-menu-link" to="/wallet/movements">
                  {t('accountSidebar.walletMyMovements')} {/* REPORT MOVEMENTS */}
                </Link>

                <Link className="sidebar-menu-link" to="/wallet/payments/add-founds">
                  {t('accountSidebar.walletAddFounds')} {/* ADD FOUNDS */}
                </Link>
              </div>
            </div>
          </div>

          <div className="sidebar-box-footer" />
        </div>
      </div>
    </div>
  )
}

export default AccountSidebar
