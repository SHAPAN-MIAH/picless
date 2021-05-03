import classNames from 'classnames'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'

import UserAvatar from '../../../../components/UserAvatar'
import useAuth from '../../../../hooks/useAuth'
import useMenu from '../../../../hooks/useMenu'

import useUser from '../../../../hooks/useUser'

const BrowserMenu: FunctionComponent<{}> = React.memo(() => {
  const { t } = useTranslation()

  const { user } = useUser()
  const { signOut } = useAuth()

  const { showMenu } = useMenu()

  const [imageProfile, setImageProfile] = useState()

  useEffect(() => {
    setImageProfile(user.profilePicture)
  }, [user])

  const validateUrl = useCallback((url: string) => {
    return window.location.href.includes(url)
  }, [])

  return (
    <>
      {/* SMALL MENU */}
      <Fade duration={400} left when={!showMenu}>
        <nav
          id="navigation-widget-small"
          className={classNames('navigation-widget navigation-widget-desktop closed sidebar left')}
        >
          <Link to={`/u/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
            <UserAvatar size="S" imageName={imageProfile || ''} />
          </Link>
          <ul className="menu small">
            {/* PROFILE-INFO */}
            <li className={classNames('menu-item', validateUrl('/account/profile-info') ? 'active' : '')}>
              <Link
                className="menu-item-link text-tooltip-tfr"
                to="/account/profile-info"
                data-title={t('navLeftMenu.profileInfo')}
              >
                <svg className="menu-item-link-icon icon-members">
                  <use xlinkHref="#svg-members" />
                </svg>
              </Link>
            </li>

            {/* ACCOUNT-INFO */}
            <li className={classNames('menu-item', validateUrl('/account/account-info') ? 'active' : '')}>
              <Link
                className="menu-item-link text-tooltip-tfr"
                to="/account/account-info"
                data-title={t('navLeftMenu.accountInfo')}
              >
                <svg className="menu-item-link-icon icon-private">
                  <use xlinkHref="#svg-private" style={{ fill: '#adafca' }} />
                </svg>
              </Link>
            </li>

            {/* SETTINGS */}
            <li className={classNames('menu-item', validateUrl('/account/settings') ? 'active' : '')}>
              <Link
                className="menu-item-link text-tooltip-tfr"
                to="/account/settings"
                data-title={t('navLeftMenu.settings')}
              >
                <svg className="menu-item-link-icon icon-settings">
                  <use xlinkHref="#svg-settings" />
                </svg>
              </Link>
            </li>

            {/* MY-SUBSCRIBERS */}
            <li className={classNames('menu-item', validateUrl('/account/my-subscriptions') ? 'active' : '')}>
              <Link
                className="menu-item-link text-tooltip-tfr"
                to="/account/my-subscriptions"
                data-title={t('navLeftMenu.mySubscriptions')}
              >
                <svg className="menu-item-link-icon icon-group">
                  <use xlinkHref="#svg-group" />
                </svg>
              </Link>
            </li>

            {/* CARDS/WALLET */}
            <li className={classNames('menu-item', validateUrl('/account/wallet') ? 'active' : '')}>
              <Link
                className="menu-item-link text-tooltip-tfr"
                to="/account/wallet"
                data-title={t('navLeftMenu.cardWallet')}
              >
                <svg className="menu-item-link-icon icon-wallet">
                  <use xlinkHref="#svg-wallet" />
                </svg>
              </Link>
            </li>

            {/* ADD-BANK */}
            <li className={classNames('menu-item', validateUrl('/account/verification') ? 'active' : '')}>
              <Link
                className="menu-item-link text-tooltip-tfr"
                to="/account/verification"
                data-title={t('navLeftMenu.addBank')}
              >
                <svg className="menu-item-link-icon icon-earnings">
                  <use xlinkHref="#svg-earnings" />
                </svg>
              </Link>
            </li>

            {/* HELP-SUPPORT */}
            <li className={classNames('menu-item', validateUrl('/support') ? 'active' : '')}>
              <Link className="menu-item-link text-tooltip-tfr" to="/support" data-title={t('navLeftMenu.helpSupport')}>
                <svg className="menu-item-link-icon icon-info">
                  <use xlinkHref="#svg-info" />
                </svg>
              </Link>
            </li>

            <li className="menu-item">
              <a
                href=""
                className="menu-item-link text-tooltip-tfr"
                style={{ color: '#adafca' }}
                data-title={t('navLeftMenu.logout')}
                onClick={() => {
                  signOut()
                }}
              >
                <svg className="menu-item-link-icon icon-login">
                  <use xlinkHref="#svg-login" style={{ fill: '#adafca' }} />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </Fade>

      <Fade duration={400} left when={showMenu}>
        <nav
          id="navigation-widget"
          className={classNames('navigation-widget navigation-widget-desktop sidebar left', showMenu ? 'delayed' : 'hidden')}
        >
          <div className="navigation-widget-cover" />
          <div className="user-short-description">
            <UserAvatar size="XL" imageName={imageProfile || ''} />

            <p className="user-short-description-title">
              <Link to={`/u/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
                {user?.fullName}
              </Link>
            </p>

            <p className="user-short-description-text">
              <Link to={`/u/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
                www.lupanar.com/{user?.userName}
              </Link>
            </p>
          </div>
          <div className="user-stats">
            <div className="user-stat">
              <p className="user-stat-title">{user?.numberOfFollowers}</p>

              <p className="user-stat-text">Followers</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{user?.numberImages}</p>

              <p className="user-stat-text">Photos</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{user?.numberVideos}</p>

              <p className="user-stat-text">Videos</p>
            </div>
          </div>

          {showMenu && (
            <>
              <ul className="menu">
                {/* PROFILE-INFO */}
                <li className={classNames('menu-item', validateUrl('/account/profile-info') ? 'active' : '')}>
                  <Link className="menu-item-link" to="/account/profile-info">
                    <svg className="menu-item-link-icon icon-members">
                      <use xlinkHref="#svg-members" />
                    </svg>
                    {t('navLeftMenu.profileInfo')}
                  </Link>
                </li>

                {/* ACCOUNT-INFO */}
                <li className={classNames('menu-item', validateUrl('/account/account-info') ? 'active' : '')}>
                  <Link className="menu-item-link" to="/account/account-info">
                    <svg className="menu-item-link-icon icon-private">
                      <use xlinkHref="#svg-private" style={{ fill: '#adafca' }} />
                    </svg>
                    {t('navLeftMenu.accountInfo')}
                  </Link>
                </li>

                {/* SETTINGS */}
                <li className={classNames('menu-item', validateUrl('/account/settings') ? 'active' : '')}>
                  <Link className="menu-item-link" to="/account/settings">
                    <svg className="menu-item-link-icon icon-settings">
                      <use xlinkHref="#svg-settings" />
                    </svg>
                    {t('navLeftMenu.settings')}
                  </Link>
                </li>

                {/* MY-SUBSCRIBERS */}
                <li className={classNames('menu-item', validateUrl('/account/my-subscriptions') ? 'active' : '')}>
                  <Link className="menu-item-link" to="/account/my-subscriptions">
                    <svg className="menu-item-link-icon icon-group">
                      <use xlinkHref="#svg-group" />
                    </svg>
                    {t('navLeftMenu.mySubscriptions')}
                  </Link>
                </li>

                {/* CARDS/WALLET */}
                <li className={classNames('menu-item', validateUrl('/account/wallet') ? 'active' : '')}>
                  <Link className="menu-item-link" to="/account/wallet">
                    <svg className="menu-item-link-icon icon-wallet">
                      <use xlinkHref="#svg-wallet" />
                    </svg>
                    {t('navLeftMenu.cardWallet')}
                  </Link>
                </li>

                {/* ADD-BANK */}
                <li className={classNames('menu-item', validateUrl('/account/verification') ? 'active' : '')}>
                  <Link className="menu-item-link " to="/account/verification">
                    <svg className="menu-item-link-icon icon-earnings">
                      <use xlinkHref="#svg-earnings" />
                    </svg>
                    {t('navLeftMenu.addBank')}
                  </Link>
                </li>

                {/* HELP-SUPPORT */}
                <li className={classNames('menu-item', validateUrl('/support') ? 'active' : '')}>
                  <Link className="menu-item-link" to="/support">
                    <svg className="menu-item-link-icon icon-info">
                      <use xlinkHref="#svg-info" />
                    </svg>
                    {t(t('navLeftMenu.helpSupport'))}
                  </Link>
                </li>
                {/* {MenuRoutes.map((item) => {
                if (item.showInMenu && item.path) {
              return (
                <li className={classNames('menu-item', route.pathname.includes(item.path) ? 'active' : '')} key={item.name}>
                <Link className="menu-item-link" to={item.path}>
                {item.iconType === 'template' && (
                  <svg className={`menu-item-link-icon icon-${item.icon}`}>
                        <use xlinkHref={`#svg-${item.icon}`} />
                        </svg>
                        )}
                        {item.iconType === 'templateWithoutColor' && (
                          <svg className={`menu-item-link-icon icon-${item.icon}`}>
                          <use xlinkHref={`#svg-${item.icon}`} style={{ fill: '#adafca' }} />
                          </svg>
                          )}
                          {t(item.title)}
                          </Link>
                          </li>
                          )
                        }

                        return null
                      })} */}

                <li className="menu-item">
                  <a
                    href=""
                    className="menu-item-link"
                    onClick={() => {
                      signOut()
                    }}
                  >
                    <svg className="menu-item-link-icon icon-login">
                      <use xlinkHref="#svg-login" style={{ fill: '#adafca' }} />
                    </svg>
                    {t('navLeftMenu.logout')}
                  </a>
                </li>
              </ul>
            </>
          )}
        </nav>
      </Fade>
    </>
  )
})

export default BrowserMenu
