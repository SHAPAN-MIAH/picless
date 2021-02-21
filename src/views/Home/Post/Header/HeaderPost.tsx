import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import UserAvatar from '../../../../components/UserAvatar'

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
      <UserAvatar imageName={user.profilePicture} size="SMALL" />

      <p className="user-status-title medium">
        <Link className="bold" to={`/user/${user.userName}`}>
          {`${user.fullName || user.userName} `}
        </Link>
        create a <span className="bold">post</span>
      </p>

      <p className="user-status-text small">{timeElapsed}</p>
    </div>
  )
}

export default HeaderPost
