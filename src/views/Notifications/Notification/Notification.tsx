import React from 'react'
import UserAvatar from '../../../components/UserAvatar'
import { NotificationType } from '../../../types/NotificationType'

type NotificationProps = { notification: NotificationType }

const Notification = (props: NotificationProps) => (
  <div className="notification-box">
    <div className="user-status notification">
      <a className="user-status-avatar" href="profile-timeline.html">
        <UserAvatar size="S" imageName="" />
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
