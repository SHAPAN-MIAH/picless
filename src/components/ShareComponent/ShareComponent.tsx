import React, { FunctionComponent, useState, ReactNode, Children } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Popup from 'reactjs-popup'

import useProfile from 'hooks/useProfile'
import FormRowItem from 'components/Common/Form/FormRowItem'
import SocialLinkList from './SocialLinkList/SocialLinkList'
import CopyToClipboardComponent from './CopyToClipboard/CopyToClipboard'

import styles from './ShareComponent.module.css'

const ShareComponent: FunctionComponent = React.memo(() => {
  const { provider } = useProfile({ disableMount: true })

  return (
    <>
      <div className="widget-box-settings">
        <div className={`${styles.shareComponent}`}>
          <Popup
            trigger={
              <div className="post-settings widget-box-post-settings-dropdown-trigger">
                <svg className={`post-settings-icon icon-more-dots ${styles.dotsShare}`}>
                  <use xlinkHref="#svg-more-dots" />
                </svg>
              </div>
            }
            position="bottom left"
            on="click"
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: '0px', border: 'none', width: '110px', borderRadius: '10px', marginLeft: '-65px' }}
            arrow={false}
          >
            <SharePopup username={provider.userName} />
          </Popup>
        </div>
      </div>
    </>
  )
})

type SharePopupProps = {
  username: string
}

const SharePopup: FunctionComponent<SharePopupProps> = ({ username }) => {
  const mainUrl = window.location.origin
  const url = `${mainUrl}/${username}`

  return (
    <div className={`simple-dropdown widget-box-post-settings-dropdown ${styles.shareBox}`}>
      {/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (
        <p
          className={`simple-dropdown-link ${styles.shareButton}`}
          onClick={() => {
            navigator
              .share({
                title: 'Picless Share',
                text: 'Join us in PicLess',
                url: url,
              })
              .catch((error) => {
                console.log(error)
              })
          }}
        >
          Share Profile
        </p>
      ) : (
        <Popup
          modal
          contentStyle={{ width: 'auto', borderRadius: '5px', minWidth: '', padding: '5px' }}
          position="center center"
          trigger={<p className="simple-dropdown-link">Share Profile</p>}
        >
          {(close: any) => (
            <div className={styles.mainPopup}>
              <div className={`${styles.closePopup}`} onClick={close}>
                <FontAwesomeIcon icon="times" color="white" size="1x" />
              </div>
              <form className="form">
                <FormRowItem>
                  <div className={styles.userInfoContainer}>
                    <div className={styles.userInfoName}>
                      <CopyToClipboardComponent userProfile={username} />
                    </div>
                  </div>
                </FormRowItem>
                <FormRowItem>
                  <h4 className={styles.socialLinkTitle}>Share To</h4>
                  <SocialLinkList userProfile={username} />
                </FormRowItem>
              </form>
            </div>
          )}
        </Popup>
      )}
    </div>
  )
}

export default ShareComponent
