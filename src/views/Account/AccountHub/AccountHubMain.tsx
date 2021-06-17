import React, { FunctionComponent, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import UploadBox from '../../../components/Common/UploadBox'
import UserAvatar from '../../../components/UserAvatar'
import useUser from '../../../hooks/useUser'

const GridDiv = styled.div`
  justify-content: center;
  margin-top: 30px !important;
  display: ${isMobile ? 'contents' : 'flex'};
  flex-direction: row;
`
const AccountHubMain: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const { getUser } = useUser()
  const [imageCover, setImageCover] = useState()
  const [imageProfile, setImageProfile] = useState('')

  useEffect(() => {
    getUser().then((user) => {
      setImageCover(process.env.REACT_APP_BUCKET_IMAGES + user.coverPicture)
      setImageProfile(user.profilePicture)
    })
  }, [getUser])

  const styleMobile: React.CSSProperties = {}

  if (!isMobile) {
    styleMobile.flex = 1
  }

  return (
    <GridDiv className="grid grid-3-3-3">
      <div className="user-preview small fixed-height" style={styleMobile}>
        <div className="user-preview-cover" style={{ background: `url(${imageCover}) center center / cover no-repeat` }}>
          <img src={imageCover} alt="cover-01" style={{ display: 'none' }} />
        </div>

        <div className="user-short-description">
          <div className="user-short-description-avatar user-avatar medium" style={{ marginLeft: '-49px' }}>
            <UserAvatar size="L" imageName={imageProfile || ''} removeContainerStyle />
          </div>
        </div>
      </div>

      <UploadBox
        id="upload-avatar"
        iconName="members"
        uploadTitleName={t('profileInfo.changeAvatar')}
        imageType="PROFILE"
        uploadText={t('profileInfo.changeAvatarDescription')} // "110x110px size minimum"
      />

      <UploadBox
        id="upload-cover"
        iconName="photos"
        uploadTitleName={t('profileInfo.changeCover')}
        imageType="COVER"
        uploadText={t('profileInfo.changeCoverDescription')} // "1184x300px size minimum"
      />
    </GridDiv>
  )
}

export default AccountHubMain
