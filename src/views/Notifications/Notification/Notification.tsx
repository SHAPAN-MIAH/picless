import React from 'react'
import { NotificationType } from '../../../types/NotificationType'

type NotificationProps = { notification: NotificationType }

const Notification = (props: NotificationProps) => (
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
          {props.notification.sourceFullName}
        </a>{' '}
        {props.notification.message}
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
)

export default Notification
