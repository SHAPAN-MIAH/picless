import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Popup from 'reactjs-popup'
import useProfile from '../../../../hooks/useProfile'
import CountryFlag from '../../../../components/CountryFlag/CountryFlag'
import UserAvatar from '../../../../components/UserAvatar'

import { WalletContextProvider } from '../../../../context/WalletContext'
import useUser from '../../../../hooks/useUser'
import { SubscriptionType, UserType } from '../../../../types/UserType'
import { GetCountryName } from '../../../../utils/Functions'
import SubscribePopup from './SubscribePopup/SubscribePopup'
import styles from './UserHeader.module.css'
import './UserHeader.css'
import { Link } from 'react-router-dom'

type UserHeaderProps = {
  subscription: SubscriptionType | null
}

const UserHeader: FunctionComponent<UserHeaderProps> = (props) => {
  const { subscription } = props

  const { provider, cancelSubscription } = useProfile({ disableMount: true })
  const { getUser } = useUser()

  const [imageCover, setImageCover] = useState(process.env.REACT_APP_BUCKET_IMAGES + provider.coverPicture)
  const [imageProfile, setImageProfile] = useState(provider.profilePicture)
  const [subscribed, setSubscribed] = useState<boolean>(subscription !== null)
  const [userData, setUserData] = useState<UserType>({})

  useEffect(() => {
    getUser().then((u: UserType) => {
      setUserData(u)
    })

    setImageCover(process.env.REACT_APP_BUCKET_IMAGES + provider.coverPicture)
    setImageProfile(provider.profilePicture)
    setSubscribed(subscription !== null)
  }, [provider, subscription, getUser])

  const countryName = GetCountryName(provider.countryCode || '')

  const onUnsubscribe = (event: any) => {
    const decision = window.confirm(`Are you sure to cancel the subscription to ${provider.userName}`)
    event.preventDefault()

    if (decision && subscription) {
      cancelSubscription(subscription.id, provider.userName).then(() => {
        window.location.reload()
      })
    }
  }
  return (
    <>
      <WalletContextProvider>
        <div className="profile-header" style={{ marginTop: isMobile ? '60px' : '0px' }}>
          <div
            className={classNames('profile-header-cover', styles.profileHeaderCoverMobile)}
            style={{ background: `url(${imageCover}) center center / cover no-repeat`, height: '20em' }}
          >
            <img src={imageCover} alt="cover-01" style={{ display: 'none' }} />
          </div>

          <div className="profile-header-info">
            <div className="user-short-description big">
              <UserAvatar size="XXL" imageName={imageProfile} />

              {/* USED FOR MOBILE PROPOUSES */}
              <UserAvatar size="XL" imageName={imageProfile} />

              <p className="user-short-description-title">
                <a href="">{provider.fullName || provider.userName}</a>
              </p>

              <p className="user-short-description-text">
                <a href="">{`@${provider.userName}`}</a>
              </p>
            </div>

            {provider.userName !== userData.userName && (
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
                    {(close: any) => <SubscribePopup onClose={close} />}
                  </Popup>
                )}

                {subscribed && (
                  <div className={classNames('profile-header-info-actions', styles.suscribeButton)}>
                    <Link
                      title="Send a message"
                      to={`/user/chat/${provider.id}`}
                      className="profile-header-info-action button secondary"
                    >
                      <span className="hide-text-mobile"> Send </span> Message
                    </Link>

                    <a
                      title="Unsubscribe"
                      href=""
                      onClick={onUnsubscribe}
                      className="profile-header-info-action button remove"
                    >
                      Unsubscribe
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="user-stats">
              <div className="user-stat big">
                <p className="user-stat-title">{provider.numberOfFollowers}</p>

                <p className="user-stat-text">followers</p>
              </div>

              <div className="user-stat big">
                <p className="user-stat-title">{provider.numberImages}</p>

                <p className="user-stat-text">Photos</p>
              </div>

              <div className="user-stat big">
                <p className="user-stat-title">{provider.numberVideos}</p>

                <p className="user-stat-text">Videos</p>
              </div>

              <div className="user-stat big flag">
                <CountryFlag className="user-stat-image" code={provider.countryCode || ''} alt={countryName} />

                <p className="user-stat-text">{countryName}</p>
              </div>
            </div>
          </div>
        </div>
      </WalletContextProvider>
    </>
  )
}

export default UserHeader
