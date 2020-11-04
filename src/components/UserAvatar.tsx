import React, { FunctionComponent } from 'react'

type UserAvatarProps = {
  image: string
}

const UserAvatar: FunctionComponent<UserAvatarProps> = (props) => {
  const { image } = props

  return (
    <>
      <div className="user-status-avatar">
        <div className="user-avatar small no-outline">
          <div className="user-avatar-content">
            <div className="hexagon-image-30-32" data-src={image} />
          </div>

          <div className="user-avatar-progress">
            <div className="hexagon-progress-40-44" />
          </div>

          <div className="user-avatar-progress-border">
            <div className="hexagon-border-40-44" />
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAvatar
