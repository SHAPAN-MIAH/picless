import UserAvatar from 'components/UserAvatar'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { PostType } from 'types/PostType'

type HeaderProps = {
  post: PostType
}

const Header: FunctionComponent<HeaderProps> = (props) => {
  const { post } = props
  const { users: user } = post

  // const timeElapsed = moment(post.registerDate).fromNow()

  const timeElapsed = moment(post.registerDate).format('LLLL');


  return (
    <>
      <div className="user-status">
        <UserAvatar imageName={user.profilePicture} size="S" />

        <p className="user-status-title medium">
          <Link className="bold" to={`/u/${user.userName}`}>
            {`${user.fullName || user.userName} `}
          </Link>
          scheduled a{' '}
          <Link to="" className="bold">
            post
          </Link>
        </p>

        <p className="user-status-text small">{timeElapsed}</p>

      </div>
    </>
  )
}

export default React.memo(Header)
