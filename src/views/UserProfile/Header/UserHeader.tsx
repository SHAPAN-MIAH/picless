import React, { FunctionComponent } from 'react'
import Popup from 'reactjs-popup'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import UserService from '../../../services/UserService'

import UserAvatar from '../../../components/UserAvatar'

import styles from './UserHeader.module.css'
import SendATip from './SendATip/SendATip'

type UserHeaderProps = {
  userName: string // TODO: TRANSFORM TO NUMBER OR SOMETHING SIMILAR
}

const UserHeader: FunctionComponent<UserHeaderProps> = (props) => {
  const { userName } = props

  const addToFavorites = () => {
    UserService.addFavouriteUser(parseInt(userName, 10)).then(() => {
      alert('User added to favorites')
    })
  }

  const suscribe = () => {
    alert('You are suscribed now')
  }

  const sendATip = () => {}
  return (
    <>
      <div className="profile-header">
        <figure className="profile-header-cover liquid">
          <img src={`${process.env.PUBLIC_URL}/assets/img/cover/01.jpg`} alt="cover-01" />
        </figure>

        <div className="profile-header-info">
          <div className="user-short-description big">
            <UserAvatar size="BIG" image={`${process.env.PUBLIC_URL}/assets/img/avatar/01.jpg`} />

            {/* USED FOR MOBILE PROPOUSES */}
            <UserAvatar size="MEDIUM" image={`${process.env.PUBLIC_URL}/assets/img/avatar/01.jpg`} />

            <p className="user-short-description-title">
              <a href="profile-timeline.html">USERNAME</a>
            </p>

            <p className="user-short-description-text">
              <a href="#/">www.gamehuntress.com</a>
            </p>
          </div>

          <div className={classNames('profile-header-social-links-wrap', styles.socialLinksWrapAdjustment)}>
            <div id="profile-header-social-links-slider" className="profile-header-social-links">
              <div className="profile-header-social-link">
                <Popup
                  modal
                  trigger={
                    <a className={classNames('social-link', styles.optionsBox)} title="Send a tip">
                      <FontAwesomeIcon color="white" icon="dollar-sign" />
                    </a>
                  }
                >
                  <SendATip />
                </Popup>
              </div>

              <div className="profile-header-social-link">
                <a
                  className={classNames('social-link', styles.optionsBox)}
                  title="Send a message"
                  href={`/user/messages/${userName}`}
                >
                  <FontAwesomeIcon color="white" icon="comments" />
                </a>
              </div>

              {/* <div className="profile-header-social-link">
                <a className={classNames('social-link', styles.optionsBox)} title="Share profile" href="#/">
                  <FontAwesomeIcon color="white" icon="share-alt" />
                </a>
              </div> */}

              <div className="profile-header-social-link" onClick={addToFavorites}>
                <a className={classNames('social-link', styles.optionsBox)} title="Add to Favorites" href="#/">
                  <FontAwesomeIcon color="white" icon="heart" />
                </a>
              </div>
            </div>

            <div className={classNames('profile-header-info-actions', styles.suscribeButton)} onClick={suscribe}>
              <p className="profile-header-info-action button secondary">
                Suscribe
                <span className="hide-text-mobile"> for 10,99€</span>
                <FontAwesomeIcon color="white" icon="lock" style={{ marginLeft: '10px' }} />
              </p>
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
              <p className="user-stat-title">930</p>

              <p className="user-stat-text">posts</p>
            </div>

            <div className="user-stat big">
              <p className="user-stat-title">182</p>

              <p className="user-stat-text">Photos</p>
            </div>

            <div className="user-stat big">
              <p className="user-stat-title">50</p>

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
