import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Prompt } from 'react-router-dom'
import PostService from '../../../services/PostService'
import { CommonPostType } from '../../../types/PostType.d'
import FormRowItem from '../../../components/Common/Form/FormRowItem'
import TextInput from '../../../components/Common/TextInput'
import LiveChat from '../../../components/LiveChat/LiveChat'
import useLive from '../../../hooks/useLive'
import LiveVideo from './LiveVideo/LiveVideo'
import OnAirLiveFooter from './OnAirLiveFooter/OnAirLiveFooter'
import WaitingLiveFooter from './WaitingLiveFooter/WaitingLiveFooter'
import LiveSectionMenu from '../../../components/LiveSectionFeatures/LiveSectionMenu/LiveSectionMenu'

const CreateLive: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const {
    videoRef,
    chatRef,
    availableDevices,
    changeVideoDevice,
    liveStatus,
    publish,
    stop,
    audioStatus,
    audioToggle,
    sendMessageChat,
  } = useLive()

  const [liveName, setLiveName] = useState<string>('')
  const [toggleChat, setToggleChat] = useState<boolean>(true)

  useEffect(() => {
    return () => {
      stopLive()
    }
  }, [])

  const startLive = () => {
    publish()

    videoRef.current?.scrollIntoView()
  }

  const stopLive = () => {
    stop()
  }

  const onToggleChat = () => {
    setToggleChat(!toggleChat)
  }

  return (
    <>
      <div className="quick-post-body">
        <Prompt when={liveStatus === 'ON_AIR'} message="You're in live session. Are you sure you want to leave?" />

        {liveStatus === 'WAITING' && (
          <div style={{ padding: '25px' }}>
            <FormRowItem>
              <TextInput
                type="text"
                id="account-profile-name"
                classNameFormInput="small"
                name="account_profile_name"
                placeholder={t('home.createLive.liveName')}
                value={liveName}
                onChange={(e) => setLiveName(e.target.value)}
              />
            </FormRowItem>
          </div>
        )}
        <FormRowItem>
          <LiveVideo
            ref={videoRef}
            // goFullScreen={goFullScreen}
            numberOfVideoDevices={availableDevices.length}
            changeVideoDevice={changeVideoDevice}
          />
        </FormRowItem>
      </div>
      <div className="quick-post-footer-actions">
        {liveStatus === 'WAITING' && (
          <WaitingLiveFooter disabled={availableDevices.length === 0} startLive={startLive} onToggleChat={onToggleChat} />
        )}

        {liveStatus === 'ON_AIR' && (
          <OnAirLiveFooter stopLive={stopLive} audioStatus={audioStatus} changeAudioStatus={audioToggle} chatRef={chatRef} />
        )}
      </div>
      <div className="widget-box">{<LiveSectionMenu onToggleChat={onToggleChat} />}</div>

      <div className="widget-box">{toggleChat && <LiveChat ref={chatRef} sendMessageChat={sendMessageChat} />}</div>
    </>
  )
}

export default CreateLive
