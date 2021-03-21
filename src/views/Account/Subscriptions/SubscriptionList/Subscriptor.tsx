import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import LiquidImage from '../../../../components/Common/LiquidImage'
import UserAvatar from '../../../../components/UserAvatar'
import { SubscriptorListType } from '../../../../types/UserType.d'

const LinkUserA = styled.a`
  left: -32px !important;
  margin-top: -3px;
`

interface SubscriptorProps {
  subscriptor: SubscriptorListType
}

const Subscriptor: FunctionComponent<SubscriptorProps> = (props) => {
  const { subscriptor } = props
  const { suscribeUser } = subscriptor

  const imageCover = process.env.REACT_APP_BUCKET_IMAGES + suscribeUser.coverPicture

  const onUnsubscribe = () => {
    prompt('Are you sure to unsubscribe to the user')
  }

  return (
    <>
      <div className="user-preview landscape">
        <LiquidImage className="user-preview-cover" src={imageCover} alt="cover-04" />

        <div className="user-preview-info">
          <div className="user-short-description landscape tiny">
            <LinkUserA className="user-short-description-avatar user-avatar small" href={`/u/${suscribeUser.userName}`}>
              <UserAvatar size="M" imageName={suscribeUser.profilePicture} removeContainerStyle />
            </LinkUserA>

            <p className="user-short-description-title">
              <a href={`/u/${suscribeUser.userName}`}>{suscribeUser.userName}</a>
            </p>

            <p className="user-short-description-text">
              <a href={`/u/${suscribeUser.userName}`}>www.lupanar.com/{suscribeUser.userName}</a>
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

            <a href={`/user/messages/${suscribeUser.id}`} className="button primary" title="Send a message">
              <svg className="button-icon icon-comment">
                <use xlinkHref="#svg-comment" />
              </svg>
            </a>

            <a href="" onClick={onUnsubscribe} className="button secundary" title="Unsubscribe">
              <svg className="button-icon icon-cross">
                <use xlinkHref="#svg-cross" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Subscriptor
