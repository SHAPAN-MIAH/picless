import React, { FunctionComponent, useContext } from 'react'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useLiveView from '../../../../hooks/useLiveView'

import LiveChat from '../../../../components/LiveChat/LiveChat'
import LiveView from '../../../../components/LiveView/LiveView'
import SendATip from '../Header/SendATip/SendATip'
import UserProfileContext from '../../../../context/UserProfileContext'

const LiveTab: FunctionComponent<{}> = () => {
  const { user } = useContext(UserProfileContext.context)

  const { videoRef, chatRef, playVideo, sendMessageChat } = useLiveView({ videojsId: 'video-player' })

  const sendATipCallback = (status: string) => {
    if (status === 'SUCCESS') sendMessageChat('SENDATIP')
  }

  return (
    <>
      <div className="grid grid-8-4 mobile-prefer-content">
        <div className="grid-column">
          <div className="widget-box">
            <LiveView videoRef={videoRef} playVideo={playVideo} />
            <Popup
              modal
              trigger={
                <div className="post-option">
                  <div className="post-option-icon">
                    <FontAwesomeIcon color="#adafca" icon="dollar-sign" />
                  </div>

                  <p className="post-option-text">Send a tip</p>
                </div>
              }
            >
              <SendATip user={user} callback={sendATipCallback} />
            </Popup>
          </div>
        </div>
        <div className="grid-column">
          <div className="widget-box">
            <LiveChat ref={chatRef} sendMessageChat={sendMessageChat} />
          </div>
        </div>
      </div>
    </>
  )
}

export default LiveTab
