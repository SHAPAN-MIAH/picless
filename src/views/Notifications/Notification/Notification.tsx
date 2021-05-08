import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../../../components/UserAvatar'
import { NotificationType } from '../../../types/NotificationType'

type NotificationProps = { notification: NotificationType }

const Notification = (props: NotificationProps) => {
  return (
    <div className="notification-box">
      <div className="user-status notification">
        <a className="user-status-avatar" href="profile-timeline.html">
          <UserAvatar size="S" imageName={props.notification.profilePicture} />
        </a>

        <p className="user-status-title">
          <a className="bold" href="profile-timeline.html">
            {props.notification.fullName}
          </a>{' '}
          {props.notification.message}
        </p>

        <p className="user-status-timestamp small-space">{moment(props.notification.registerDate).fromNow()}</p>

        {props.notification.type === 'POSTLIKE' && (
          <Link to={`/u/${props.notification.userName}/post/${props.notification.postId}`}>
            <div className="user-status-icon">
              <FontAwesomeIcon icon="heart" color="tomato" />
            </div>
          </Link>
        )}

        {props.notification.type !== 'POSTLIKE' && (
          <Link to={`/u/${props.notification.userName}/post/${props.notification.postId}`}>
            <div className="user-status-icon">
              <svg className="icon-comment">
                <use xlinkHref="#svg-comment" />
              </svg>
            </div>
          </Link>
        )}
      </div>

      {/* <div className="notification-box-close-button">
              <svg className="notification-box-close-button-icon icon-cross">
                <use xlinkHref="#svg-cross" />
              </svg>
            </div>
        
            <div className="mark-unread-button" /> */}
    </div>
  )
}

export default Notification
