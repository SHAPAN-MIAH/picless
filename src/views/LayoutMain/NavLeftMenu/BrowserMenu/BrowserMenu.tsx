import React, { FunctionComponent, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useMenu from '../../../../hooks/useMenu'

import UserAvatar from '../../../../components/UserAvatar'
import { UserType } from '../../../../types/UserType.d'
import useUser from '../../../../hooks/useUser'
import useAuth from '../../../../hooks/useAuth'

const BrowserMenu: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { getUser } = useUser()
  const { signOut } = useAuth()

  const { showMenu } = useMenu()

  const [imageCover, setImageCover] = useState()
  const [imageProfile, setImageProfile] = useState()
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    getUser().then((userData) => {
      setUser(userData)

      setImageCover(process.env.REACT_APP_BUCKET_IMAGES + userData.coverPicture)
      setImageProfile(userData.profilePicture)
    })
  }, [getUser])

  return (
    <>
      {/* SMALL MENU */}
      <nav
        id="navigation-widget-small"
        className={classNames(
          'navigation-widget navigation-widget-desktop closed sidebar left',
          showMenu ? 'hidden' : 'delayed'
        )}
      >
        <Link to={`/user/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
          <UserAvatar size="SMALL" imageName={imageProfile || ''} />
        </Link>
        <ul className="menu small">
          {/* PROFILE-INFO */}
          <li className="menu-item">
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
          <li className="menu-item">
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
          <li className="menu-item">
            <Link className="menu-item-link text-tooltip-tfr" to="/account/settings" data-title={t('navLeftMenu.settings')}>
              <svg className="menu-item-link-icon icon-settings">
                <use xlinkHref="#svg-settings" />
              </svg>
            </Link>
          </li>

          {/* MY-SUBSCRIBERS */}
          <li className="menu-item">
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
          <li className="menu-item">
            <Link className="menu-item-link text-tooltip-tfr" to="/account/wallet" data-title={t('navLeftMenu.cardWallet')}>
              <svg className="menu-item-link-icon icon-wallet">
                <use xlinkHref="#svg-wallet" />
              </svg>
            </Link>
          </li>

          {/* ADD-BANK */}
          <li className="menu-item">
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

          {/* HELP - SUPPORT */}
          <li className="menu-item">
            <Link
              className="menu-item-link text-tooltip-tfr"
              style={{ color: '#adafca' }}
              to="/help"
              data-title={t('navLeftMenu.helpSupport')}
            >
              <svg className="menu-item-link-icon icon-info">
                <use xlinkHref="#svg-info" />
              </svg>
            </Link>
          </li>

          {/* LOGOUT */}
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

      <nav
        id="navigation-widget"
        className={classNames('navigation-widget navigation-widget-desktop sidebar left', showMenu ? 'delayed' : 'hidden')}
        data-simplebar
      >
        <div
          className="navigation-widget-cover"
          style={{ background: `url(${imageCover}) center center / cover no-repeat` }}
        >
          <img src={imageCover} alt="cover-01" style={{ display: 'none' }} />
        </div>
        <div className="user-short-description">
          <UserAvatar size="MEDIUM" imageName={imageProfile || ''} />

          <p className="user-short-description-title">
            <Link to={`/user/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              {user?.fullName}
            </Link>
          </p>

          <p className="user-short-description-text">
            <Link to={`/user/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              www.lupanar.com/{user?.userName}
            </Link>
          </p>
        </div>
        <ul className="menu">
          <li className="menu-item">
            <Link className="menu-item-link" to="/account/account-info">
              <svg className="menu-item-link-icon icon-members">
                <use xlinkHref="#svg-members" />
              </svg>
              {t('navLeftMenu.accountInfo')}
            </Link>
          </li>

          {/* PROFILE-INFO */}
          <li className="menu-item">
            <Link className="menu-item-link" to="/account/profile-info">
              <svg className="menu-item-link-icon icon-private">
                <use xlinkHref="#svg-private" style={{ fill: '#adafca' }} />
              </svg>
              {t('navLeftMenu.profileInfo')}
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
      </nav>
    </>
  )
}

export default BrowserMenu
