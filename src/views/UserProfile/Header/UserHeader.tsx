import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserAvatar from '../../../components/UserAvatar'

const UserHeader: FunctionComponent<{}> = () => {
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

          <div className="profile-header-social-links-wrap" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div id="profile-header-social-links-slider" className="profile-header-social-links">
              <div className="profile-header-social-link">
                <a className="social-link" title="Send a tip" style={{ backgroundColor: '#3e3f5e' }} href="#/">
                  <FontAwesomeIcon color="white" icon="dollar-sign" />
                </a>
              </div>

              <div className="profile-header-social-link">
                <a className="social-link" title="Send a tip" style={{ backgroundColor: '#3e3f5e' }} href="#/">
                  <FontAwesomeIcon color="white" icon="comments" />
                </a>
              </div>

              <div className="profile-header-social-link">
                <a className="social-link" title="Send a tip" style={{ backgroundColor: '#3e3f5e' }} href="#/">
                  <FontAwesomeIcon color="white" icon="share-alt" />
                </a>
              </div>
            </div>

            <div
              className="profile-header-info-actions"
              style={{ display: 'flex', justifyContent: 'right', position: 'static' }}
            >
              <p className="profile-header-info-action button secondary">
                <span className="hide-text-mobile">Suscribe for 10,99€</span>
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
