import React, { FunctionComponent, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import UserAvatar from '../../../../components/UserAvatar'

import { UserType } from '../../../../types/UserType.d'
import useMenu from '../../../../hooks/useMenu'
import useUser from '../../../../hooks/useUser'
import useAuth from '../../../../hooks/useAuth'

const MobileMenu: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { showMenu, setShowMenu } = useMenu()
  const { signOut } = useAuth()
  const { getUser } = useUser()

  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    getUser().then((userData: UserType) => {
      setUser(userData)
    })
  }, [user, showMenu])

  const logout = () => {
    signOut()
  }

  const handleCloseMenu = () => {
    setShowMenu(false)
  }

  return (
    <>
      <nav
        id="navigation-widget-mobile"
        className={classNames('navigation-widget navigation-widget-mobile sidebar left', showMenu ? 'visible' : 'hidden')}
        data-simplebar
      >
        <div className="navigation-widget-close-button" onClick={handleCloseMenu}>
          <svg className="navigation-widget-close-button-icon icon-back-arrow">
            <use xlinkHref="#svg-back-arrow" />
          </svg>
        </div>

        <div className="navigation-widget-info-wrap">
          <div className="navigation-widget-info">
            <Link to={`/user/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              <UserAvatar size="SMALL" imageName={user?.profilePicture} />
            </Link>

            <p className="navigation-widget-info-title">
              <a href={`/user/${user?.userName}`}>{user?.fullName}</a>
            </p>

            <p className="navigation-widget-info-text">Welcome Back!</p>
          </div>

          <a className="navigation-widget-info-button button small secondary" href="" onClick={logout}>
            {t('navLeftMenu.logout')}
          </a>
        </div>

        <p className="navigation-widget-section-title">Sections</p>

        <ul className="menu">
          {/* PROFILE-INFO */}
          <li className="menu-item">
            <Link className="menu-item-link" to="/account/profile-info">
              <svg className="menu-item-link-icon icon-members">
                <use xlinkHref="#svg-members" />
              </svg>
              {t('navLeftMenu.profileInfo')}
            </Link>
          </li>

          {/* ACCOUNT-INFO */}
          <li className="menu-item">
            <Link className="menu-item-link" to="/account/account-info">
              <svg className="menu-item-link-icon icon-private">
                <use xlinkHref="#svg-private" style={{ fill: '#adafca' }} />
              </svg>
              {t('navLeftMenu.accountInfo')}
            </Link>
          </li>

          {/* SETTINGS */}
          <li className="menu-item">
            <Link className="menu-item-link" to="/account/settings">
              <svg className="menu-item-link-icon icon-settings">
                <use xlinkHref="#svg-settings" />
              </svg>
              {t('navLeftMenu.settings')}
            </Link>
          </li>

          {/* MY-SUBSCRIPTIONS */}
          <li className="menu-item">
            <Link className="menu-item-link" to="/account/my-subscriptions">
              <svg className="menu-item-link-icon icon-group">
                <use xlinkHref="#svg-group" />
              </svg>
              {t('navLeftMenu.mySubscriptions')}
            </Link>
          </li>

          {/* CARDS/WALLET */}
          <li className="menu-item">
            <Link className="menu-item-link" to="/account/wallet">
              <svg className="menu-item-link-icon icon-wallet">
                <use xlinkHref="#svg-wallet" />
              </svg>
              {t('navLeftMenu.cardWallet')}
            </Link>
          </li>

          {/* ADD-BANK */}
          <li className="menu-item">
            <Link className="menu-item-link" to="/account/verification">
              <svg className="menu-item-link-icon icon-earnings">
                <use xlinkHref="#svg-earnings" />
              </svg>
              {t('navLeftMenu.addBank')}
            </Link>
          </li>

          {/* HELP/SUPPORT */}
          <li className="menu-item">
            <Link className="menu-item-link" to="/help">
              <svg className="menu-item-link-icon icon-info">
                <use xlinkHref="#svg-info" />
              </svg>
              {t('navLeftMenu.helpSupport')}
            </Link>
          </li>
        </ul>
      </nav>

      {showMenu && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 99998,
            backgroundColor: 'rgba(21, 21, 31, .96)',
            opacity: '1',
            visibility: 'visible',
            transition: 'opacity .3s ease-in-out, visibility .3s ease-in-out',
          }}
          onClick={handleCloseMenu}
        >
          {' '}
        </div>
      )}
    </>
  )
}

export default MobileMenu
