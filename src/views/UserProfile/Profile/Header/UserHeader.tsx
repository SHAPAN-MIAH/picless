import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popup from 'reactjs-popup'

import { userSelector } from '../../../../redux/User/UserSelectors'

import UserProfileContext from '../../../../context/UserProfileContext'
import UserAvatar from '../../../../components/UserAvatar'

import styles from './UserHeader.module.css'

import { UserType } from '../../../../types/UserType.d'
import SubscribePopup from './SubscribePopup/SubscribePopup'
import { WalletContextProvider } from '../../../../context/WalletContext'

type UserHeaderProps = {
  isSuscribe: boolean | null
  // user: UserProfileType
}

const UserHeader: FunctionComponent<UserHeaderProps> = (props) => {
  const { isSuscribe } = props

  const { user } = useContext(UserProfileContext.context)

  const [imageCover, setImageCover] = useState(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
  const [imageProfile, setImageProfile] = useState(user.profilePicture)
  const [subscribed, setSubscribed] = useState(isSuscribe)

  const userData: UserType = useSelector(userSelector)

  useEffect(() => {
    setImageCover(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
    setImageProfile(user.profilePicture)
    setSubscribed(isSuscribe)
  }, [user, isSuscribe])

  return (
    <>
      <WalletContextProvider>
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

            {user.userName !== userData.userName && (
              <div className={classNames('profile-header-social-links-wrap', styles.socialLinksWrapAdjustment)}>
                {!subscribed && (
                  <Popup
                    modal
                    contentStyle={{ width: '330px', borderRadius: '5px', minWidth: '' }}
                    position="center center"
                    trigger={
                      <div className={classNames('profile-header-info-actions', styles.suscribeButton)}>
                        <p className="profile-header-info-action button primary">
                          Suscribe
                          <FontAwesomeIcon color="white" icon="lock" style={{ marginLeft: '10px' }} />
                        </p>
                      </div>
                    }
                  >
                    <SubscribePopup />
                  </Popup>
                )}

                {subscribed && (
                  <div className={classNames('profile-header-info-actions', styles.suscribeButton)}>
                    <a
                      title="Send a message"
                      href={`/user/messages/${user.id}`}
                      className="profile-header-info-action button secondary"
                    >
                      <FontAwesomeIcon color="white" icon="comments" /> <span className="hide-text-mobile"> Send </span>{' '}
                      Message
                    </a>
                  </div>
                )}
              </div>
            )}

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
      </WalletContextProvider>
    </>
  )
}

export default UserHeader
