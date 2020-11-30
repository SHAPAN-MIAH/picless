import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import UserAvatar from '../../../../../components/UserAvatar'

import { UserSearchType } from '../../../../../types/UserType.d'

const SearchBarItem: FunctionComponent<{ data: UserSearchType }> = (props) => {
  const { data } = props
  return (
    <>
      <Link to={`/user/${data.userName}`} className="dropdown-box-list-item">
        <div className="user-status notification">
          <UserAvatar imageName={data.avatarPicture} size="SMALL" />

          <p className="user-status-title">
            <span className="bold">{data.fullName}</span>
          </p>

          <p className="user-status-text">{data.userName}</p>

          <div className="user-status-icon">
            <svg className="icon-friend">
              <use xlinkHref="#svg-friend" />
            </svg>
          </div>
        </div>
      </Link>
    </>
  )
}

export default SearchBarItem
