import React, { FunctionComponent, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { userSelector } from '../../../../redux/User/UserSelectors'
import UserAvatar from '../../../../components/UserAvatar'
import { signOut } from '../../../../redux/Auth/AuthThunks'

import { UserType } from '../../../../types/UserType.d'
import useMenu from '../../../../hooks/useMenu'

const MobileMenu: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { showMenu, setShowMenu } = useMenu()

  const userData: UserType = useSelector(userSelector)

  const [imageProfile, setImageProfile] = useState(userData.profilePicture)

  useEffect(() => {
    setImageProfile(userData.profilePicture)
  }, [userData, showMenu])

  const logout = () => {
    dispatch(signOut())
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
            <Link to={`/user/${userData.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              <UserAvatar size="SMALL" imageName={imageProfile} />
            </Link>

            <p className="navigation-widget-info-title">
              <a href={`/user/${userData.userName}`}>{userData.fullName}</a>
            </p>

            <p className="navigation-widget-info-text">Welcome Back!</p>
          </div>

          <a className="navigation-widget-info-button button small secondary" href="#/" onClick={logout}>
            {t('navLeftMenu.logout')}
          </a>
        </div>

        <p className="navigation-widget-section-title">Sections</p>

        <ul className="menu">
          <li className="menu-item">
            <Link className="menu-item-link" to="/user/home">
              <svg className="menu-item-link-icon icon-newsfeed">
                <use xlinkHref="#svg-newsfeed" />
              </svg>
              {t('navLeftMenu.home')}
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/account/account-info">
              <svg className="menu-item-link-icon icon-settings">
                <use xlinkHref="#svg-settings" />
              </svg>
              {t('navLeftMenu.accountInfo')}
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/account/profile-info">
              <svg className="menu-item-link-icon icon-settings">
                <use xlinkHref="#svg-settings" />
              </svg>
              {t('navLeftMenu.profileInfo')}
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/wallet/payments/add-founds">
              <svg className="menu-item-link-icon icon-revenue">
                <use xlinkHref="#svg-revenue" />
              </svg>
              {t('navLeftMenu.addFounds')}
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/wallet/payments/add-card">
              <svg className="menu-item-link-icon icon-wallet">
                <use xlinkHref="#svg-wallet" />
              </svg>
              {t('navLeftMenu.addCard')}
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/account/my-subscriptions">
              <svg className="menu-item-link-icon icon-group">
                <use xlinkHref="#svg-group" />
              </svg>
              {t('navLeftMenu.mySubscriptions')}
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/wallet/overview">
              <svg className="menu-item-link-icon icon-wallet">
                <use xlinkHref="#svg-wallet" />
              </svg>
              {t('navLeftMenu.walletOverview')}
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/user/messages">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
              {t('navLeftMenu.messages')}
            </Link>
          </li>
        </ul>

        <p className="navigation-widget-section-title">My Profile</p>

        <Link className="navigation-widget-section-link" to="/account/account-info">
          {t('navLeftMenu.accountInfo')}
        </Link>

        <Link className="navigation-widget-section-link" to="/account/profile-info">
          {t('navLeftMenu.profileInfo')}
        </Link>

        <Link className="navigation-widget-section-link" to="/wallet/payments/add-founds">
          {t('navLeftMenu.addFounds')}
        </Link>

        <Link className="navigation-widget-section-link" to="/wallet/payments/add-card">
          {t('navLeftMenu.addCard')}
        </Link>

        <Link className="navigation-widget-section-link" to="/account/my-subscriptions">
          {t('navLeftMenu.mySubscriptions')}
        </Link>

        <Link className="navigation-widget-section-link" to="/wallet/overview">
          {t('navLeftMenu.walletOverview')}
        </Link>
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
