import React, { FunctionComponent, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import UploadBox from '../../../components/Common/UploadBox'

interface AccountHubMainProps {
  coverPicture: string
  profilePicture: string
}

const AccountHubMain: FunctionComponent<AccountHubMainProps> = (props) => {
  const { t } = useTranslation()
  const {
    coverPicture = `${process.env.PUBLIC_URL}/assets/img/cover/01.jpg`,
    profilePicture = `${process.env.PUBLIC_URL}/assets/img/avatar/01.jpg`,
  } = props

  let pictureCover = coverPicture
  let pictureProfile = profilePicture

  const [imageCover, setImageCover] = useState(pictureCover)
  const [imageProfile, setImageProfile] = useState(pictureProfile)

  useEffect(() => {

    if (coverPicture != "")
    {
      setImageCover(coverPicture)
    }

    if (pictureProfile != "")
    {
      setImageProfile(pictureProfile)
    }
    
  }, [profilePicture, imageProfile, coverPicture, imageCover])

  const updateImage = (param: any) => {}

  return (
    <div className="grid grid-3-3-3 centered">
      <div className="user-preview small fixed-height">
        <div className="user-preview-cover" style={{ background: `url(${coverPicture}) center center / cover no-repeat` }}>
          <img src={coverPicture} alt="cover-01" style={{ display: 'none' }} />
        </div>

        <div className="user-preview-info">
          <div className="user-short-description small">
            <div className="user-short-description-avatar user-avatar">
              <div className="user-avatar-border">
                <div className="hexagon-100-110" />
              </div>

              <div className="user-avatar-content">
                <div
                  className="hexagon-image-68-74"
                  style={{ background: `url(${profilePicture}) center center / cover no-repeat` }}
                />
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-84-92" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-84-92" />
              </div>

              <div className="user-avatar-badge">
                <div className="user-avatar-badge-border">
                  <div className="hexagon-28-32" />
                </div>

                <div className="user-avatar-badge-content">
                  <div className="hexagon-dark-22-24" />
                </div>

                <p className="user-avatar-badge-text" style={{ height: '0px' }}>
                  24
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {imageProfile ? (
        <UploadBox
          id="upload-avatar"
          iconName="members"
          uploadTitleName={t('profileInfo.changeAvatar')}
          imageType="PROFILE"
          uploadText={t('profileInfo.changeAvatarDescription')} // "110x110px size minimum"
          imageUrl={profilePicture}
          onChange={updateImage}
        />
      ) : (
        <h4>Loading ...</h4>
      )}

      {imageCover ? (
        <UploadBox
          id="upload-cover"
          iconName="photos"
          uploadTitleName={t('profileInfo.changeCover')}
          imageType="COVER"
          uploadText={t('profileInfo.changeCoverDescription')} // "1184x300px size minimum"
          imageUrl={imageCover}
          onChange={updateImage}
        />
      ) : (
        <h4>Loading ...</h4>
      )}
    </div>
  )
}

export default AccountHubMain
