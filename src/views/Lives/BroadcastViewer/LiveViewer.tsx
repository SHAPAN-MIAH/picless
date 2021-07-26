import React, { FunctionComponent, useContext, useState } from 'react'
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
import LiveSectionMenu from 'components/LiveSectionFeatures/LiveSectionMenu/LiveSectionMenu';
import About from 'components/LiveSectionFeatures/About/About'
import PhotoGallery from 'components/LiveSectionFeatures/PhotoGallery/PhotoGallery'
import VideoGallery from 'components/LiveSectionFeatures/VideoGallery/VideoGallery'

const LiveViewer: FunctionComponent<{}> = () => {
  const { streamId } = useParams<{ streamId: string }>()
  const { loading, subscription, provider } = useProfile()

  // const { user } = useUser()

  const [currentTab, setCurrentTab] = useState<string>('CHAT')
  const [toggleChat, setToggleChat] = useState<boolean>(true)

  const onToggleChat = () => {
    setToggleChat(!toggleChat)
  }

  const { videoRef, chatRef, playVideo, sendMessageChat } = useLiveView({ streamId, videojsId: 'video-player' })

  const sendATipCallback = (status: string) => {
    if (status === 'SUCCESS') sendMessageChat('SENDATIP')
  }


  return (
    <>
      <div className="Live_container">
        <div className="liveViewContainer" >
          <div className="grid-column">
            <div className="widget-box">
              <LiveView videoRef={videoRef} playVideo={playVideo} />
              <Popup
                modal
                trigger={
                  <div className="post-option sendTipBtn" style={{ marginTop: "20px", marginLeft: "20px" }}>
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
            <div style={{ margin: '10px 0px' }} className="widget-box">{<LiveSectionMenu toggleTab={setCurrentTab} onToggleChat={onToggleChat} />}</div>
            <div className="widget-box">
              {toggleChat && <LiveChat ref={chatRef} sendMessageChat={sendMessageChat} />}
              <div>
                <div style={{ display: currentTab === 'PHOTOS' ? 'block' : 'none', marginTop: "10px" }} className="widget-box">{<PhotoGallery />}</div>
                <div style={{ display: currentTab === 'VIDEOS' ? 'block' : 'none', marginTop: "10px" }} className="widget-box">{<VideoGallery />}</div>
                <div style={{ display: currentTab === 'ABOUT' ? 'block' : 'none', marginTop: "10px" }} className="widget-box">{<About />} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LiveViewer
