import React, { FunctionComponent } from 'react'
import UserAvatar from '../../../../../components/UserAvatar'
import { NotificationType } from '../../../../../types/NotificationType'

type NotificationProps = {
  notification: NotificationType
}

const Notification: FunctionComponent<NotificationProps> = (props) => {
  const { notification } = props

  return (
    <>
      <div className="dropdown-box-list-item unread">
        <div className="user-status notification">
          <a className="user-status-avatar" href="">
            <UserAvatar size="S" imageName="" />
          </a>

          <p className="user-status-title">
            <a className="bold" href="profile-timeline.html">
              {notification.sourceFullName}
            </a>{' '}
            {notification.message}
          </p>

          <p className="user-status-timestamp">2 minutes ago</p>

          <div className="user-status-icon">
            <svg className="icon-comment">
              <use xlinkHref="#svg-comment" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notification
