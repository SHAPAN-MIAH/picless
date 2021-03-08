import React, { FunctionComponent, useEffect } from 'react'

type AvatarSize = 'BIG' | 'MEDIUM' | 'SMALL' | 'TINY'

type UserAvatarProps = {
  imageName: string
  size?: AvatarSize
}

const UserAvatar: FunctionComponent<UserAvatarProps> = (props) => {
  const { imageName, size = 'SMALL' } = props

  const imageUrl = process.env.REACT_APP_BUCKET_IMAGES + imageName

  useEffect(() => {
    if (window.tpl) {
      window.tpl.load(['user-avatar'])
    }
  }, [imageUrl])

  return (
    <>
      {size === 'TINY' && (
        <div className="user-avatar tiny no-border">
          <div className="user-avatar-content">
            <div
              className="hex"
              style={{ width: '24px', height: '26px', background: `url(${imageUrl}) center center / cover no-repeat` }}
            />
          </div>
        </div>
      )}
      {size === 'SMALL' && (
        <div className="user-status-avatar">
          <div className="user-avatar small no-outline">
            <div className="user-avatar-content">
              <div className="hexagon-image-30-32" data-src={imageUrl} />
            </div>

            <div className="user-avatar-progress">
              <div className="hexagon-progress-40-44" />
            </div>

            <div className="user-avatar-progress-border">
              <div className="hexagon-border-40-44" />
            </div>
          </div>
        </div>
      )}

      {size === 'MEDIUM' && (
        <div className="user-short-description-avatar user-short-description-avatar-mobile user-avatar medium">
          <div className="user-avatar-border">
            <div className="hexagon-120-132" />
          </div>

          <div className="user-avatar-content">
            <div className="hexagon-image-82-90" data-src={imageUrl} />
          </div>

          <div className="user-avatar-progress">
            <div className="hexagon-progress-100-110" />
          </div>

          <div className="user-avatar-progress-border">
            <div className="hexagon-border-100-110" />
          </div>
        </div>
      )}

      {size === 'BIG' && (
        <div className="user-short-description-avatar user-avatar big">
          <div className="user-avatar-border">
            <div className="hexagon-148-164" />
          </div>
          <div className="user-avatar-content">
            <div className="hexagon-image-100-110" data-src={imageUrl} />
          </div>

          <div className="user-avatar-progress">
            <div className="hexagon-progress-124-136" />
          </div>

          <div className="user-avatar-progress-border">
            <div className="hexagon-border-124-136" />
          </div>
        </div>
      )}
    </>
  )
}

export default UserAvatar
