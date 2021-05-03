import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../../../../../components/UserAvatar'
import { UserSearchType } from '../../../../../types/UserType'

const SearchBarItem: FunctionComponent<{ data: UserSearchType; onClick: () => void }> = (props) => {
  const { data, onClick } = props
  return (
    <>
      <Link to={`/u/${data.userName}`} className="dropdown-box-list-item" onClick={onClick}>
        <div className="user-status notification">
          <UserAvatar imageName={data.avatarPicture} size="S" />

          <p className="user-status-title">
            <span className="bold">{data.fullName}</span>
          </p>

          <p className="user-status-text">@{data.userName}</p>

          <div className="user-status-icon"> </div>
        </div>
      </Link>
    </>
  )
}

export default SearchBarItem
