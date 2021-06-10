import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../../../components/UserAvatar'
import { NotificationType } from '../../../types/NotificationType'
import useNotifications from '../../../hooks/useNotification'

const AllTab: FunctionComponent<{}> = () => {
  const { notifications } = useNotifications()
  return (
    <div style={{ marginTop: '10px' }}>
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-box" style={{ marginTop: '10px' }}>
          <div className="user-status notification">
            <a className="user-status-avatar" href="profile-timeline.html">
              <UserAvatar size="S" imageName={notification.profilePicture} />
            </a>

            <p className="user-status-title">
              <a className="bold" href="profile-timeline.html">
                {notification.fullName}
              </a>{' '}
              {notification.message}
            </p>

            <p className="user-status-timestamp small-space">{moment(notification.registerDate).fromNow()}</p>

            {notification.type === 'POSTLIKE' && (
              <Link to={`/u/${notification.userName}/post/${notification.postId}`}>
                <div className="user-status-icon">
                  <FontAwesomeIcon icon="heart" color="tomato" />
                </div>
              </Link>
            )}

            {notification.type !== 'POSTLIKE' && (
              <Link to={`/u/${notification.userName}/post/${notification.postId}`}>
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
      ))}
    </div>
  )
}

export default AllTab
