import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import useMenu from '../../../../hooks/useMenu'

import { userSelector } from '../../../../redux/User/UserSelectors'
import UserAvatar from '../../../../components/UserAvatar'
import { UserType } from '../../../../types/UserType.d'
import classNames from 'classnames'

const BrowserMenu: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const userData: UserType = useSelector(userSelector)

  const { showMenu, setShowMenu } = useMenu()

  const [imageCover, setImageCover] = useState(process.env.REACT_APP_BUCKET_IMAGES + userData.coverPicture)
  const [imageProfile, setImageProfile] = useState(userData.profilePicture)

  useEffect(() => {
    setImageCover(process.env.REACT_APP_BUCKET_IMAGES + userData.coverPicture)
    setImageProfile(userData.profilePicture)
  }, [userData])

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
        <Link to={`/user/${userData.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
          <UserAvatar size="SMALL" imageName={imageProfile} />
        </Link>
        <ul className="menu small">
          <li className="menu-item">
            <Link className="menu-item-link text-tooltip-tfr" to="/user/home" data-title={t('navLeftMenu.home')}>
              <svg className="menu-item-link-icon icon-newsfeed">
                <use xlinkHref="#svg-newsfeed" />
              </svg>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              className="menu-item-link text-tooltip-tfr"
              to="/account/account-info"
              data-title={t('navLeftMenu.accountInfo')}
            >
              <svg className="menu-item-link-icon icon-settings">
                <use xlinkHref="#svg-settings" />
              </svg>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              className="menu-item-link text-tooltip-tfr"
              to="/account/profile-info"
              data-title={t('navLeftMenu.profileInfo')}
            >
              <svg className="menu-item-link-icon icon-settings">
                <use xlinkHref="#svg-settings" />
              </svg>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              className="menu-item-link text-tooltip-tfr"
              to="/wallet/payments/add-founds"
              data-title={t('navLeftMenu.addFounds')}
            >
              <svg className="menu-item-link-icon icon-revenue">
                <use xlinkHref="#svg-revenue" />
              </svg>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              className="menu-item-link text-tooltip-tfr"
              to="/wallet/payments/add-card"
              data-title={t('navLeftMenu.addCard')}
            >
              <svg className="menu-item-link-icon icon-wallet">
                <use xlinkHref="#svg-wallet" />
              </svg>
            </Link>
          </li>

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

          <li className="menu-item">
            <Link
              className="menu-item-link text-tooltip-tfr"
              to="/wallet/overview"
              data-title={t('navLeftMenu.walletOverview')}
            >
              <svg className="menu-item-link-icon icon-wallet">
                <use xlinkHref="#svg-wallet" />
              </svg>
            </Link>
          </li>

          <li className="menu-item">
            <Link
              className="menu-item-link text-tooltip-tfr"
              style={{ color: '#adafca' }}
              to="/user/messages"
              data-title={t('navLeftMenu.messages')}
            >
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
            </Link>
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
          <UserAvatar size="MEDIUM" imageName={imageProfile} />

          <p className="user-short-description-title">
            <Link to={`/user/${userData.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              {userData.fullName}
            </Link>
          </p>

          <p className="user-short-description-text">
            <Link to={`/user/${userData.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              www.lupanar.com/{userData.userName}
            </Link>
          </p>
        </div>
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
      </nav>
    </>
  )
}

export default BrowserMenu
