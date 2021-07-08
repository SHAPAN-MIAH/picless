import React, { FunctionComponent, useContext, useState } from 'react'
import Popup from 'reactjs-popup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useLiveView from '../../../../hooks/useLiveView'

import LiveChat from '../../../../components/LiveChat/LiveChat'
import LiveView from '../../../../components/LiveView/LiveView'

import ProviderProfileContext from '../../../../context/ProviderProfileContext'
import SendATip from 'components/SendATip/SendATip'
import LiveSectionMenu from './../../../../components/LiveSectionFeatures/LiveSectionMenu/LiveSectionMenu';
import PhotoGallery from 'components/LiveSectionFeatures/PhotoGallery/PhotoGallery'
import VideoGallery from 'components/LiveSectionFeatures/VideoGallery/VideoGallery'
import About from 'components/LiveSectionFeatures/About/About'


const LiveTab: FunctionComponent<{}> = () => {
  const { provider } = useContext(ProviderProfileContext.context)

  const [currentTab, setCurrentTab] = useState<string>('CHAT')
  const [toggleChat, setToggleChat] = useState<boolean>(true)

  const { videoRef, chatRef, playVideo, sendMessageChat } = useLiveView({ videojsId: 'video-player' })

  const sendATipCallback = (status: string) => {
    if (status === 'SUCCESS') sendMessageChat('SENDATIP')
  }

  const onToggleChat = () => {
    setToggleChat(!toggleChat)
  }

  return (
    <>
      <div style={{ marginTop: '10vh' }}>
        <div style={{ width: "60%", margin: "auto" }}>

          <div className="grid  mobile-prefer-content">
            <div className="grid-column">
              <div className="widget-box">
                <LiveView videoRef={videoRef} playVideo={playVideo} />
                <Popup
                  modal
                  trigger={
                    <div className="post-option" style={{ marginTop: "20px" }}>
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
            {/* <div className="grid-column">
            <div className="widget-box">
              <LiveChat ref={chatRef} sendMessageChat={sendMessageChat} />

            </div>

            </div> */}
          </div>
          <div style={{ margin: '10px 0px' }} className="widget-box">{<LiveSectionMenu toggleTab={setCurrentTab} onToggleChat={onToggleChat} />}</div>

          <div className="widget-box">{toggleChat && <LiveChat ref={chatRef} sendMessageChat={sendMessageChat} />}</div>
          <div style={{ display: currentTab === 'PHOTOS' ? 'block' : 'none', marginTop: "10px" }} className="widget-box">{<PhotoGallery />}</div>
          <div style={{ display: currentTab === 'VIDEOS' ? 'block' : 'none', marginTop: "10px" }} className="widget-box">{<VideoGallery />}</div>
          <div style={{ display: currentTab === 'ABOUT' ? 'block' : 'none', marginTop: "10px" }} className="widget-box">{<About />} </div>
        </div>
      </div>
    </>
  )
}

export default LiveTab
