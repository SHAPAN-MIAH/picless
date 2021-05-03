import React, { FunctionComponent } from 'react'

import UserAvatar from '../../../../../components/UserAvatar'
import { UserType } from '../../../../../types/UserType'

import styles from './LivePromotion.module.css'

const LivePromotion: FunctionComponent<{ user: UserType }> = (props) => {
  const { user } = props

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.watchSide}>
            <div className={styles.liveWatchTextContainer}>
              <p className={styles.liveStreamText}>Live Stream</p>
              <p className={styles.watchNowText}>Watch Now</p>
            </div>
          </div>
          <div className={styles.avatarSide}>
            <div className={styles.avatarContainer}>
              <UserAvatar size="XXL" imageName={user.profilePicture} />
            </div>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <h5>I'm playing Athenas Goddess Story...</h5>
          <p className={styles.userNameText}>@{user.userName}</p>
        </div>
      </div>
    </>
  )
}

export default LivePromotion
