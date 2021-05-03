<<<<<<< HEAD
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

const Notifications: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid grid-3-6-3 mobile-prefer-content">
          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">My profile</p>

                <h2 className="section-title">Notifications</h2>
              </div>
              <div className="section-header-actions">
                <p className="section-header-action">Mark all as Read</p>

                <Link to="/account/settings" className="section-header-action">
                  Settings
                </Link>
              </div>
            </div>

            <div className="grid-column">
              <div className="notification-box-list">
                <div className="notification-box">
                  <div className="user-status notification">
                    <a className="user-status-avatar" href="profile-timeline.html">
                      <div className="user-avatar small no-outline">
                        <div className="user-avatar-content">
                          <div className="hexagon-image-30-32" data-src="img/avatar/03.jpg" />
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

                          <p className="user-avatar-badge-text">16</p>
                        </div>
                      </div>
                    </a>

                    <p className="user-status-title">
                      <a className="bold" href="profile-timeline.html">
                        Nick Grissom
                      </a>{' '}
                      posted a comment on your{' '}
                      <a className="highlighted" href="profile-timeline.html">
                        status update
                      </a>
                    </p>

                    <p className="user-status-timestamp small-space">2 minutes ago</p>

                    <div className="user-status-icon">
                      <svg className="icon-comment">
                        <use xlinkHref="#svg-comment" />
                      </svg>
                    </div>
                  </div>

                  <div className="notification-box-close-button">
                    <svg className="notification-box-close-button-icon icon-cross">
                      <use xlinkHref="#svg-cross" />
                    </svg>
                  </div>

                  <div className="mark-unread-button" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
=======
import React, { FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import useNotifications from '../../hooks/useNotification'

import Notification from './Notification/Notification'

const Notifications: FunctionComponent<{}> = () => {
  const { notifications } = useNotifications()

  useEffect(() => {
    window.tpl.load(['sidebar'])
  }, [])

  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid grid-2-7-2">
          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">My profile</p>

                <h2 className="section-title">Notifications</h2>
              </div>
              <div className="section-header-actions">
                <p className="section-header-action">Mark all as Read</p>

                <Link to="/account/settings" className="section-header-action">
                  Settings
                </Link>
              </div>
            </div>

            <div className="grid-column">
              <div className="notification-box-list">
                {notifications.map((notification) => {
                  return <Notification key={notification.id} notification={notification} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
>>>>>>> stage-5
