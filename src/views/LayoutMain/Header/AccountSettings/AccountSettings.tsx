import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { userSelector } from '../../../../redux/User/UserSelectors'

import { signOut } from '../../../../redux/Auth/AuthThunks'
import { UserType } from '../../../../types/UserType.d'
import UserAvatar from '../../../../components/UserAvatar'

const AccountSettings: FunctionComponent<{}> = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const userData: UserType = useSelector(userSelector)

  // const [imageCover, setImageCover] = useState(process.env.REACT_APP_BUCKET_IMAGES + userData.coverPicture)
  const [imageProfile, setImageProfile] = useState(userData.profilePicture)

  useEffect(() => {
    // setImageCover(userData.coverPicture)
    setImageProfile(userData.profilePicture)
  }, [userData])

  const logout = () => {
    dispatch(signOut())
  }

  return (
    <>
      <div className="action-item-wrap">
        <div className="action-item dark header-settings-dropdown-trigger">
          <svg className="action-item-icon icon-settings">
            <use xlinkHref="#svg-settings" />
          </svg>
        </div>

        <div className="dropdown-navigation header-settings-dropdown">
          <div className="dropdown-navigation-header">
            <div className="user-status">
              <Link to={`/user/${userData.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
                <UserAvatar size="SMALL" imageName={imageProfile} />
              </Link>

              <p className="user-status-title">
                <span className="bold">Hi {userData.firstName}!</span>
              </p>

              <p className="user-status-text small">
                <a href="profile-timeline.html">@{userData.userName}</a>
              </p>
            </div>
          </div>

          <p className="dropdown-navigation-category">{t('accountSettings.myProfileSection')}</p>

          <Link className="dropdown-navigation-link" to="/account/profile-info">
            {t('accountSettings.profileInfo')}
          </Link>

          <Link className="dropdown-navigation-link" to="/user/messages">
            {t('accountSettings.messages')}
          </Link>

          {/* <a className="dropdown-navigation-link" href="hub-profile-social.html">
            Social &amp; Stream
          </a>

          <a className="dropdown-navigation-link" href="hub-profile-notifications.html">
            Notifications
          </a>

          <a className="dropdown-navigation-link" href="hub-profile-messages.html">
            Messages
          </a>

          <a className="dropdown-navigation-link" href="hub-profile-requests.html">
            Friend Requests
          </a> */}

          <p className="dropdown-navigation-category">{t('accountSettings.accountSection')}</p>

          <Link className="dropdown-navigation-link" to="/account/account-info">
            {t('accountSettings.accountInfo')}
          </Link>

          <Link className="dropdown-navigation-link" to="/account/change-password">
            {t('accountSettings.changePassword')}
          </Link>

          <Link className="dropdown-navigation-link" to="/account/settings">
            {t('accountSettings.settings')}
          </Link>

          <p className="dropdown-navigation-category">Groups</p>

          {/* <a className="dropdown-navigation-link" href="hub-group-management.html">
            Manage Groups
          </a>

          <a className="dropdown-navigation-link" href="hub-group-invitations.html">
            Invitations
          </a>

          <p className="dropdown-navigation-category">My Store</p>

          <a className="dropdown-navigation-link" href="hub-store-account.html">
            My Account <span className="highlighted">$250,32</span>
          </a>

          <a className="dropdown-navigation-link" href="hub-store-statement.html">
            Sales Statement
          </a>

          <a className="dropdown-navigation-link" href="hub-store-items.html">
            Manage Items
          </a>

          <a className="dropdown-navigation-link" href="hub-store-downloads.html">
            Downloads
          </a> */}

          <a className="dropdown-navigation-button button small secondary" href="#/" onClick={logout}>
            {t('accountSettings.logout')}
          </a>
        </div>
      </div>
    </>
  )
}

export default AccountSettings
