import React, { FunctionComponent, useContext } from 'react'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useLiveView from '../../../hooks/useLiveView'

import LiveChat from '../../../components/LiveChat/LiveChat'
import LiveView from '../../../components/LiveView/LiveView'

import ProviderProfileContext from '../../../context/ProviderProfileContext'
import SendATip from 'components/SendATip/SendATip'
import useProfile from 'hooks/useProfile'
import useUser from 'hooks/useUser'
import { useParams } from 'react-router-dom'

const LiveViewer: FunctionComponent<{}> = () => {
  const { streamId } = useParams<{ streamId: string }>()
  const { loading, subscription, provider } = useProfile()

  // const { user } = useUser()

  const { videoRef, chatRef, playVideo, sendMessageChat } = useLiveView({ streamId, videojsId: 'video-player' })

  const sendATipCallback = (status: string) => {
    if (status === 'SUCCESS') sendMessageChat('SENDATIP')
  }

  return (
    <>
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
            <SendATip user={provider} callback={sendATipCallback} />
          </Popup>
        </div>
      </div>
      <div className="grid-column">
        <div className="widget-box">
          <LiveChat ref={chatRef} sendMessageChat={sendMessageChat} />
        </div>
      </div>
    </>
  )
}

export default LiveViewer
