import React, { FunctionComponent, useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import UserService from '../../../services/UserService'

import UserAvatar from '../../../components/UserAvatar'

import styles from './UserHeader.module.css'
import SendATip from './SendATip/SendATip'
import { UserProfileType } from '../../../types/UserType.d'

type UserHeaderProps = {
  user: UserProfileType
}

const UserHeader: FunctionComponent<UserHeaderProps> = (props) => {
  const { user } = props

  const [imageCover, setImageCover] = useState(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
  const [imageProfile, setImageProfile] = useState(user.profilePicture)

  useEffect(() => {
    setImageCover(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
    setImageProfile(user.profilePicture)
  }, [user])

  const addToFavorites = () => {
    if (user.id) {
      UserService.addFavouriteUser(user.id).then(() => {
        alert('User added to favorites')
      })
    }
  }

  const suscribe = () => {
    alert('You are suscribed now')
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

          {/* <Popup
                  modal
                  trigger={
                    <a href="#/" className={classNames('social-link', styles.optionsBox)} title="Send a tip">
                      <FontAwesomeIcon color="white" icon="dollar-sign" />
                    </a>
                  }
                >
                  <SendATip user={user} />
                </Popup> */}
          <div className={classNames('profile-header-social-links-wrap', styles.socialLinksWrapAdjustment)}>
            <div className={classNames('profile-header-info-actions', styles.suscribeButton)} onClick={suscribe}>
              <p className="profile-header-info-action button primary">
                Suscribe
                <span className="hide-text-mobile"> for 10,99€</span>
                <FontAwesomeIcon color="white" icon="lock" style={{ marginLeft: '10px' }} />
              </p>
            </div>

            <div className={classNames('profile-header-info-actions', styles.suscribeButton)}>
              <a
                title="Send a message"
                href={`/user/messages/${user.id}`}
                className="profile-header-info-action button secondary"
              >
                <FontAwesomeIcon color="white" icon="comments" /> <span className="hide-text-mobile"> Send </span> Message
              </a>
            </div>
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
