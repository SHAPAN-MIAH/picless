import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import styles from './UserAvatar.module.css'

type AvatarSize = 'XXL' | 'XL' | 'L' | 'M' | 'S' | 'XS'

type UserAvatarProps = {
  imageName: string
  size?: AvatarSize
  removeContainerStyle?: boolean
}

const UserAvatar: FunctionComponent<UserAvatarProps> = React.memo((props) => {
  const { imageName, size = 'S', removeContainerStyle = false } = props

  const imageUrl = process.env.REACT_APP_BUCKET_IMAGES + imageName

  return (
    <>
      {size === 'XS' && (
        <div className="user-avatar tiny no-border">
          <div className="user-avatar-content">
            <div
              className="hex"
              style={{ width: '24px', height: '26px', background: `url(${imageUrl}) center center / cover no-repeat` }}
            />
          </div>
        </div>
      )}

      {size === 'S' && !removeContainerStyle && (
        <div className="user-status-avatar">
          <div className="user-avatar small no-outline">
            <div className={classNames(styles.hex, styles['hex-border-44'])}>
              <div
                className={classNames(styles.hex, styles['hex-38'])}
                style={{
                  background: `url(${imageUrl}) center center / cover no-repeat`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {size === 'S' && removeContainerStyle && (
        <div className={classNames(styles.hex, styles['hex-border-44'])}>
          <div
            className={classNames(styles.hex, styles['hex-38'])}
            style={{
              background: `url(${imageUrl}) center center / cover no-repeat`,
            }}
          />
        </div>
      )}

      {size === 'M' && removeContainerStyle && (
        <div className={classNames(styles.hex, styles['hex-border-64'])}>
          <div
            className={classNames(styles.hex, styles['hex-54'])}
            style={{
              background: `url(${imageUrl}) center center / cover no-repeat`,
            }}
          />
        </div>
      )}

      {size === 'L' && removeContainerStyle && (
        <div className={classNames(styles.hex, styles['hex-border-98'])}>
          <div
            className={classNames(styles.hex, styles['hex-82'])}
            style={{
              background: `url(${imageUrl}) center center / cover no-repeat`,
            }}
          />
        </div>
      )}

      {size === 'XL' && (
        <div className="user-short-description-avatar user-short-description-avatar-mobile user-avatar medium">
          <div className={classNames(styles.hex, styles['hex-border-126'])}>
            <div
              className={classNames(styles.hex, styles['hex-110'])}
              style={{
                background: `url(${imageUrl}) center center / cover no-repeat`,
              }}
            />
          </div>
        </div>
      )}

      {size === 'XXL' && (
        <div className="user-short-description-avatar user-avatar big">
          <div className={classNames(styles.hex, styles['hex-border-164'])}>
            <div
              className={classNames(styles.hex, styles['hex-148'])}
              style={{
                background: `url(${imageUrl}) center center / cover no-repeat`,
              }}
            />
          </div>
        </div>
      )}
    </>
  )
})

export default UserAvatar
