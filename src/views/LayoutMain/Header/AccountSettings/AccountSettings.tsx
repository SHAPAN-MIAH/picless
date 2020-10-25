import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const AccountSettings: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

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
              <a className="user-status-avatar" href="profile-timeline.html">
                <div className="user-avatar small no-outline">
                  <div className="user-avatar-content">
                    <div className="hexagon-image-30-32" data-src="img/avatar/01.jpg" />
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

                    <p className="user-avatar-badge-text">24</p>
                  </div>
                </div>
              </a>

              <p className="user-status-title">
                <span className="bold">Hi Marina!</span>
              </p>

              <p className="user-status-text small">
                <a href="profile-timeline.html">@marinavalentine</a>
              </p>
            </div>
          </div>

          <p className="dropdown-navigation-category">{t('accountSettings.myProfileSection')}</p>

          <Link className="dropdown-navigation-link" to="/account/profile-info">
            {t('accountSettings.profileInfo')}
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

          <p className="dropdown-navigation-button button small secondary">Logout</p>
        </div>
      </div>
    </>
  )
}

export default AccountSettings
