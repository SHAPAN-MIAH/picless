import moment from 'moment'
import React, { FunctionComponent } from 'react'

import { UserType } from '../../../../types/UserType.d'

type HeaderPostProps = {
  user: UserType
  datePost: Date
}

const HeaderPost: FunctionComponent<HeaderPostProps> = (props) => {
  const { user, datePost } = props

  const timeElapsed = moment(datePost).fromNow()

  return (
    <div className="user-status">
      {/* <UserAvatar image={imageUrl(user?.profilePicture)} size="SMALL" /> */}
      <div className="user-status-avatar">
        <div className="user-avatar small no-outline">
          <div className="user-avatar-content">
            <div className="hex">
              <img
                alt="asd"
                style={{ width: '40px', height: '42px' }}
                src={process.env.REACT_APP_BUCKET_IMAGES + user.profilePicture}
              />
            </div>
          </div>

          <div className="user-avatar-progress">
            <div className="hexagon-progress-40-44" />
          </div>

          <div className="user-avatar-progress-border">
            <div className="hexagon-border-40-44" />
          </div>
        </div>
      </div>

      <p className="user-status-title medium">
        <a className="bold" href="profile-timeline.html">
          {`${user.fullName || user.userName} `}
        </a>
        create a <span className="bold">post</span>
      </p>

      <p className="user-status-text small">{timeElapsed}</p>
    </div>
  )
}

export default HeaderPost
