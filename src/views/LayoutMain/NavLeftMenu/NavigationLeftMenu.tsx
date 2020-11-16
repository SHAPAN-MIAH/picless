import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '../../../redux/Auth/AuthThunks'
import { userSelector } from '../../../redux/User/UserSelectors'
import UserAvatar from '../../../components/UserAvatar'
import { UserType } from '../../../types/UserType.d'

const NavigationLeftMenu: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const userData: UserType = useSelector(userSelector)

  const [imageCover, setImageCover] = useState(process.env.REACT_APP_BUCKET_IMAGES + userData.coverPicture)
  const [imageProfile, setImageProfile] = useState(process.env.REACT_APP_BUCKET_IMAGES + userData.profilePicture)

  useEffect(() => {
    setImageCover(process.env.REACT_APP_BUCKET_IMAGES + userData.coverPicture)
    setImageProfile(process.env.REACT_APP_BUCKET_IMAGES + userData.profilePicture)
  }, [userData])

  const logout = () => {
    dispatch(signOut())
  }

  return (
    <>
      {/* SMALL MENU */}
      <nav id="navigation-widget-small" className="navigation-widget navigation-widget-desktop closed sidebar left delayed">
        <Link to={`/user/${userData.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
          <UserAvatar size="SMALL" image={imageProfile} />
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
              <svg className="menu-item-link-icon icon-newsfeed">
                <use xlinkHref="#svg-newsfeed" />
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

          {/* <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="overview.html" data-title="Overview">
              <svg className="menu-item-link-icon icon-overview">
                <use xlinkHref="#svg-overview" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="groups.html" data-title="Groups">
              <svg className="menu-item-link-icon icon-group">
                <use xlinkHref="#svg-group" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="members.html" data-title="Members">
              <svg className="menu-item-link-icon icon-members">
                <use xlinkHref="#svg-members" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="badges.html" data-title="Badges">
              <svg className="menu-item-link-icon icon-badges">
                <use xlinkHref="#svg-badges" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="quests.html" data-title="Quests">
              <svg className="menu-item-link-icon icon-quests">
                <use xlinkHref="#svg-quests" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="streams.html" data-title="Streams">
              <svg className="menu-item-link-icon icon-streams">
                <use xlinkHref="#svg-streams" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="events.html" data-title="Events">
              <svg className="menu-item-link-icon icon-events">
                <use xlinkHref="#svg-events" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="forums.html" data-title="Forums">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="marketplace.html" data-title="Marketplace">
              <svg className="menu-item-link-icon icon-marketplace">
                <use xlinkHref="#svg-marketplace" />
              </svg>
            </a>
          </li> */}
        </ul>
      </nav>

      <nav id="navigation-widget" className="navigation-widget navigation-widget-desktop sidebar left hidden" data-simplebar>
        <div
          className="navigation-widget-cover"
          style={{ background: `url(${imageCover}) center center / cover no-repeat` }}
        >
          <img src={imageCover} alt="cover-01" style={{ display: 'none' }} />
        </div>

        <div className="user-short-description">
          <UserAvatar size="MEDIUM" image={imageProfile} />

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

        <div className="user-stats">
          <div className="user-stat">
            <p className="user-stat-title">930</p>

            <p className="user-stat-text">posts</p>
          </div>

          <div className="user-stat">
            <p className="user-stat-title">182</p>

            <p className="user-stat-text">photos</p>
          </div>

          <div className="user-stat">
            <p className="user-stat-title">50</p>

            <p className="user-stat-text">videos</p>
          </div>
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
              <svg className="menu-item-link-icon icon-newsfeed">
                <use xlinkHref="#svg-newsfeed" />
              </svg>
              {t('navLeftMenu.accountInfo')}
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

          <li className="menu-item">
            <Link className="menu-item-link" to="/user/marceloProfile">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
              Profile Test 1 (Marcelo)
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/user/ElDT43">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
              Profile Test 2 (Bruno)
            </Link>
          </li>

          {/* <li className="menu-item">
            <a className="menu-item-link" href="overview.html">
              <svg className="menu-item-link-icon icon-overview">
                <use xlinkHref="#svg-overview" />
              </svg>
              Overview
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="groups.html">
              <svg className="menu-item-link-icon icon-group">
                <use xlinkHref="#svg-group" />
              </svg>
              Groups
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="members.html">
              <svg className="menu-item-link-icon icon-members">
                <use xlinkHref="#svg-members" />
              </svg>
              Members
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="badges.html">
              <svg className="menu-item-link-icon icon-badges">
                <use xlinkHref="#svg-badges" />
              </svg>
              Badges
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="quests.html">
              <svg className="menu-item-link-icon icon-quests">
                <use xlinkHref="#svg-quests" />
              </svg>
              Quests
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="streams.html">
              <svg className="menu-item-link-icon icon-streams">
                <use xlinkHref="#svg-streams" />
              </svg>
              Streams
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="events.html">
              <svg className="menu-item-link-icon icon-events">
                <use xlinkHref="#svg-events" />
              </svg>
              Events
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="forums.html">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
              Forums
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="marketplace.html">
              <svg className="menu-item-link-icon icon-marketplace">
                <use xlinkHref="#svg-marketplace" />
              </svg>
              Marketplace
            </a>
          </li> */}
        </ul>
      </nav>

      {/* MOBILE MENU */}

      <nav
        id="navigation-widget-mobile"
        className="navigation-widget navigation-widget-mobile sidebar left hidden"
        data-simplebar
      >
        <div className="navigation-widget-close-button">
          <svg className="navigation-widget-close-button-icon icon-back-arrow">
            <use xlinkHref="#svg-back-arrow" />
          </svg>
        </div>

        <div className="navigation-widget-info-wrap">
          <div className="navigation-widget-info">
            <Link to={`/user/${userData.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              <UserAvatar size="SMALL" image={imageProfile} />
            </Link>

            <p className="navigation-widget-info-title">
              <a href="profile-timeline.html">{userData.fullName}</a>
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
              <svg className="menu-item-link-icon icon-newsfeed">
                <use xlinkHref="#svg-newsfeed" />
              </svg>
              {t('navLeftMenu.accountInfo')}
            </Link>
          </li>

          <li className="menu-item">
            <Link className="menu-item-link" to="/account/account-info">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
              {t('navLeftMenu.messages')}
            </Link>
          </li>

          {/* <li className="menu-item">
            <a className="menu-item-link" href="overview.html">
              <svg className="menu-item-link-icon icon-overview">
                <use xlinkHref="#svg-overview" />
              </svg>
              Overview
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="groups.html">
              <svg className="menu-item-link-icon icon-group">
                <use xlinkHref="#svg-group" />
              </svg>
              Groups
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="members.html">
              <svg className="menu-item-link-icon icon-members">
                <use xlinkHref="#svg-members" />
              </svg>
              Members
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="badges.html">
              <svg className="menu-item-link-icon icon-badges">
                <use xlinkHref="#svg-badges" />
              </svg>
              Badges
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="quests.html">
              <svg className="menu-item-link-icon icon-quests">
                <use xlinkHref="#svg-quests" />
              </svg>
              Quests
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="streams.html">
              <svg className="menu-item-link-icon icon-streams">
                <use xlinkHref="#svg-streams" />
              </svg>
              Streams
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="events.html">
              <svg className="menu-item-link-icon icon-events">
                <use xlinkHref="#svg-events" />
              </svg>
              Events
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="forums.html">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
              Forums
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="marketplace.html">
              <svg className="menu-item-link-icon icon-marketplace">
                <use xlinkHref="#svg-marketplace" />
              </svg>
              Marketplace
            </a>
          </li> */}
        </ul>

        <p className="navigation-widget-section-title">My Profile</p>

        <Link className="navigation-widget-section-link" to="/account/profile-info">
          {t('navLeftMenu.profileInfo')}
        </Link>

        <Link className="navigation-widget-section-link" to="/user/marceloProfile">
          Profile Test 1
        </Link>

        <Link className="navigation-widget-section-link" to="/user/ElDT43">
          Profile Test 2
        </Link>

        {/* <a className="navigation-widget-section-link" href="hub-profile-social.html">
          Social &amp; Stream
        </a>

        <a className="navigation-widget-section-link" href="hub-profile-notifications.html">
          Notifications
        </a>

        <a className="navigation-widget-section-link" href="hub-profile-messages.html">
          Messages
        </a>

        <a className="navigation-widget-section-link" href="hub-profile-requests.html">
          Friend Requests
        </a>

        <p className="navigation-widget-section-title">Account</p>

        <a className="navigation-widget-section-link" href="hub-account-info.html">
          Account Info
        </a>

        <a className="navigation-widget-section-link" href="hub-account-password.html">
          Change Password
        </a>

        <a className="navigation-widget-section-link" href="hub-account-settings.html">
          General Settings
        </a>

        <p className="navigation-widget-section-title">Groups</p>

        <a className="navigation-widget-section-link" href="hub-group-management.html">
          Manage Groups
        </a>

        <a className="navigation-widget-section-link" href="hub-group-invitations.html">
          Invitations
        </a>

        <p className="navigation-widget-section-title">My Store</p>

        <a className="navigation-widget-section-link" href="hub-store-account.html">
          My Account <span className="highlighted">$250,32</span>
        </a>

        <a className="navigation-widget-section-link" href="hub-store-statement.html">
          Sales Statement
        </a>

        <a className="navigation-widget-section-link" href="hub-store-items.html">
          Manage Items
        </a>

        <a className="navigation-widget-section-link" href="hub-store-downloads.html">
          Downloads
        </a>

        <p className="navigation-widget-section-title">Main Links</p>

        <a className="navigation-widget-section-link" href="#/">
          Home
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Careers
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Faqs
        </a>

        <a className="navigation-widget-section-link" href="#/">
          About Us
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Our Blog
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Contact Us
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Privacy Policy
        </a> */}
      </nav>
    </>
  )
}

export default NavigationLeftMenu
