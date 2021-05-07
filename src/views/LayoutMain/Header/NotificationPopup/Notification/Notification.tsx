import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../../../../../components/UserAvatar'
import { NotificationType } from '../../../../../types/NotificationType'

type NotificationProps = {
  notification: NotificationType
}

const Notification: FunctionComponent<NotificationProps> = (props) => {
  const { notification } = props
  const timeElapsed = moment(notification.registerDate).fromNow()
  return (
    <>
      <div className="dropdown-box-list-item unread">
        <div className="user-status notification">
          <a className="user-status-avatar" href="">
            <UserAvatar size="S" imageName={notification.profilePicture} />
          </a>

          <p className="user-status-title">
            <a className="bold" href="profile-timeline.html">
              {notification.fullName}
            </a>{' '}
            {notification.message}
          </p>

          <p className="user-status-timestamp">{timeElapsed}</p>

          <Link to={`/u/${notification.userName}/post/${notification.postId}`}>


          <div className="user-status-icon">
            <svg className="icon-comment">
              <use xlinkHref="#svg-comment" />
            </svg>
          </div>
          </Link>

        </div>
      </div>
    </>
  )
}

export default Notification
