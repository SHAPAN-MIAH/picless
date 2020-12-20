import React, { FunctionComponent, useEffect, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PaymentService from '../../../services/PaymentService'

import UserAvatar from '../../../components/UserAvatar'

import styles from './UserHeader.module.css'

import { UserProfileType } from '../../../types/UserType.d'

type UserHeaderProps = {
  isSuscribe: boolean | null
  user: UserProfileType
}

const UserHeader: FunctionComponent<UserHeaderProps> = (props) => {
  const { user, isSuscribe } = props

  const [imageCover, setImageCover] = useState(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
  const [imageProfile, setImageProfile] = useState(user.profilePicture)
  const [subscribed, setSubscribed] = useState(isSuscribe)

  useEffect(() => {
    setImageCover(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
    setImageProfile(user.profilePicture)
    setSubscribed(isSuscribe)
  }, [user, isSuscribe])

  const suscribeToUser = () => {
    if (user.id && user.planId) {
      PaymentService.suscribeToUser(user.planId, user.id).then((data: any) => {
        if (data.code === 0) {
          setSubscribed(true)
          alert('You are subscribed')
        } else {
          alert(`Error ${data.code} => ${data.message}`)
        }
      })
    }
  }

  return (
    <>
      <div className="profile-header">
        <div className="profile-header-cover" style={{ background: `url(${imageCover}) center center / cover no-repeat` }}>
          <img src={imageCover} alt="cover-01" style={{ display: 'none' }} />
        </div>

        <div className="profile-header-info">
          <div className="user-short-description big">
            <UserAvatar size="BIG" imageName={imageProfile} />

            {/* USED FOR MOBILE PROPOUSES */}
            <UserAvatar size="MEDIUM" imageName={imageProfile} />

            <p className="user-short-description-title">
              <a href="profile-timeline.html">{user.userName}</a>
            </p>

            <p className="user-short-description-text">
              <a href="#/">www.lupanar.com/{user.userName}</a>
            </p>
          </div>

          <div className={classNames('profile-header-social-links-wrap', styles.socialLinksWrapAdjustment)}>
            {!subscribed && (
              <div className={classNames('profile-header-info-actions', styles.suscribeButton)} onClick={suscribeToUser}>
                <p className="profile-header-info-action button primary">
                  Suscribe
                  <span className="hide-text-mobile"> for 10,99€</span>
                  <FontAwesomeIcon color="white" icon="lock" style={{ marginLeft: '10px' }} />
                </p>
              </div>
            )}

            {subscribed && (
              <div className={classNames('profile-header-info-actions', styles.suscribeButton)}>
                <a
                  title="Send a message"
                  href={`/user/messages/${user.id}`}
                  className="profile-header-info-action button secondary"
                >
                  <FontAwesomeIcon color="white" icon="comments" /> <span className="hide-text-mobile"> Send </span> Message
                </a>
              </div>
            )}
          </div>

          <div id="profile-header-social-links-slider-controls" className="slider-controls">
            <div className="slider-control left">
              <svg className="slider-control-icon icon-small-arrow">
                <use xlinkHref="#svg-small-arrow" />
              </svg>
            </div>

            <div className="slider-control right">
              <svg className="slider-control-icon icon-small-arrow">
                <use xlinkHref="#svg-small-arrow" />
              </svg>
            </div>
          </div>

          <div className="user-stats">
            <div className="user-stat big">
              <p className="user-stat-title">{user.numberOfFollowers}</p>

              <p className="user-stat-text">followers</p>
            </div>

            <div className="user-stat big">
              <p className="user-stat-title">{user.numberImages}</p>

              <p className="user-stat-text">Photos</p>
            </div>

            <div className="user-stat big">
              <p className="user-stat-title">{user.numberVideos}</p>

              <p className="user-stat-text">Videos</p>
            </div>

            <div className="user-stat big">
              <img className="user-stat-image" src={`${process.env.PUBLIC_URL}/assets/img/flag/usa.png`} alt="flag-usa" />

              <p className="user-stat-text">usa</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserHeader
