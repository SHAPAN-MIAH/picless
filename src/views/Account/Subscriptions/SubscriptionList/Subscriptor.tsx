import React, { FunctionComponent } from 'react'

import LiquidImage from '../../../../components/Common/LiquidImage'

import { SubscriptorListType } from '../../../../types/UserType.d'

interface SubscriptorProps {
  subscriptor: SubscriptorListType
}

const Subscriptor: FunctionComponent<SubscriptorProps> = (props) => {
  const { subscriptor } = props
  const { suscribeUser } = subscriptor

  const imageCover = process.env.REACT_APP_BUCKET_IMAGES + suscribeUser.coverPicture
  const imageProfile = process.env.REACT_APP_BUCKET_IMAGES + suscribeUser.profilePicture

  return (
    <>
      <div className="user-preview landscape">
        <LiquidImage className="user-preview-cover" src={imageCover} alt="cover-04" />

        <div className="user-preview-info">
          <div className="user-short-description landscape tiny">
            <a className="user-short-description-avatar user-avatar small" href={`/user/${suscribeUser.userName}`}>
              <div className="user-avatar-border">
                <div className="hexagon-50-56" />
              </div>

              <div className="user-avatar-content">
                <div className="hexagon-image-30-32" data-src={imageProfile} />
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-40-44" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-40-44" />
              </div>
            </a>

            <p className="user-short-description-title">
              <a href={`/user/${suscribeUser.userName}`}>{suscribeUser.userName}</a>
            </p>

            <p className="user-short-description-text">
              <a href={`/user/${suscribeUser.userName}`}>www.lupanar.com/{suscribeUser.userName}</a>
            </p>
          </div>

          <div className="user-stats">
            <div className="user-stat">
              <p className="user-stat-title">{suscribeUser.numberOfFollowers}</p>

              <p className="user-stat-text">Followers</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{suscribeUser.numberImages}</p>

              <p className="user-stat-text">Photos</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{suscribeUser.numberVideos}</p>

              <p className="user-stat-text">Videos</p>
            </div>
          </div>

          <div className="user-preview-actions">
            {/* <p className="button secondary">
              <svg className="button-icon icon-add-friend">
                <use xlinkHref="#svg-add-friend" />
              </svg>
            </p> */}

            <a href={`/user/messages/${suscribeUser.id}`} className="button primary">
              <svg className="button-icon icon-comment">
                <use xlinkHref="#svg-comment" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Subscriptor
