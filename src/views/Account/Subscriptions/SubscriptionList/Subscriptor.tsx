import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { unixTimestampToDate } from 'utils/Helpers'
import useSubscription from '../../../../hooks/useSubscription'
import LiquidImage from '../../../../components/Common/LiquidImage'
import UserAvatar from '../../../../components/UserAvatar'
import { SubscriptorListType } from '../../../../types/UserType'

const LinkUserA = styled.a`
  left: -32px !important;
  margin-top: -3px;
`

const ContainerDiv = styled.div`
  margin: 20px 0 20px 0;
`

interface SubscriptorProps {
  subscriptor: SubscriptorListType
}

const Subscriptor: FunctionComponent<SubscriptorProps> = (props) => {
  const { subscriptor } = props
  const { suscribeUser: subscribeUser, subscription } = subscriptor

  const { cancelSubscription } = useSubscription()

  const imageCover = process.env.REACT_APP_BUCKET_IMAGES + subscribeUser.coverPicture

  const onUnsubscribe = (event: any) => {
    const decision = window.confirm(`Are you sure to cancel the subscription to ${subscribeUser.userName}`)
    event.preventDefault()

    if (decision) {
      cancelSubscription(subscriptor.subscriptionId, subscribeUser.userName)
    }
  }

  return (
    <>
      <ContainerDiv className="user-preview landscape">
        <LiquidImage className="user-preview-cover" src={imageCover} alt="cover-04" />

        <div className="user-preview-info">
          <div className="user-short-description landscape tiny">
            <LinkUserA className="user-short-description-avatar user-avatar small" href={`/u/${subscribeUser.userName}`}>
              <UserAvatar size="M" imageName={subscribeUser.profilePicture} removeContainerStyle />
            </LinkUserA>

            <p className="user-short-description-title">
              <a href={`/u/${subscribeUser.userName}`}>{subscribeUser.userName}</a>
            </p>

            <p className="user-short-description-text">
              <a href={`/u/${subscribeUser.userName}`}>www.lupanar.com/{subscribeUser.userName}</a>
            </p>
          </div>

          <div className="user-stats">
            <div className="user-stat">
              <p className="user-stat-title">{subscribeUser.numberOfFollowers}</p>

              <p className="user-stat-text">Followers</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{subscribeUser.numberImages}</p>

              <p className="user-stat-text">Photos</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{subscribeUser.numberVideos}</p>

              <p className="user-stat-text">Videos</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{unixTimestampToDate(subscription.currentPeriodEnd)}</p>

              <p className="user-stat-text">End Date</p>
            </div>
          </div>

          <div className="user-preview-actions">
            {/* <p className="button secondary">
              <svg className="button-icon icon-add-friend">
                <use xlinkHref="#svg-add-friend" />
              </svg>
            </p> */}

            <a href={`/user/messages/${subscribeUser.id}`} className="button primary" title="Send a message">
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
      </ContainerDiv>
    </>
  )
}

export default Subscriptor
