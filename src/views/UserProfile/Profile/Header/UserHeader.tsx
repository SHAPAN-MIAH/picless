import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popup from 'reactjs-popup'

import useUser from '../../../../hooks/useUser'

import ProviderProfileContext from '../../../../context/ProviderProfileContext'
import UserAvatar from '../../../../components/UserAvatar'

import styles from './UserHeader.module.css'

import { UserType } from '../../../../types/UserType.d'
import SubscribePopup from './SubscribePopup/SubscribePopup'
import { WalletContextProvider } from '../../../../context/WalletContext'
import { GetCountryName } from '../../../../utils/Functions'
import CountryFlag from '../../../../components/CountryFlag/CountryFlag'

type UserHeaderProps = {
  isSuscribe: boolean | null
}

const UserHeader: FunctionComponent<UserHeaderProps> = (props) => {
  const { isSuscribe } = props

  const { provider } = useContext(ProviderProfileContext.context)
  const { getUser } = useUser()

  const [imageCover, setImageCover] = useState(process.env.REACT_APP_BUCKET_IMAGES + provider.coverPicture)
  const [imageProfile, setImageProfile] = useState(provider.profilePicture)
  const [subscribed, setSubscribed] = useState(isSuscribe)
  const [userData, setUserData] = useState<UserType>({})

  useEffect(() => {
    getUser().then((u: UserType) => {
      setUserData(u)
    })

    setImageCover(process.env.REACT_APP_BUCKET_IMAGES + provider.coverPicture)
    setImageProfile(provider.profilePicture)
    setSubscribed(isSuscribe)
  }, [provider, isSuscribe])

  const countryName = GetCountryName(provider.countryCode || '')

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
                <a href="profile-timeline.html">{provider.userName}</a>
              </p>

              <p className="user-short-description-text">
                <a href="#/">www.lupanar.com/{provider.userName}</a>
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
                    <SubscribePopup />
                  </Popup>
                )}

                {subscribed && (
                  <div className={classNames('profile-header-info-actions', styles.suscribeButton)}>
                    <a
                      title="Send a message"
                      href={`/user/messages/${provider.id}`}
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

              <div className="user-stat big">
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
