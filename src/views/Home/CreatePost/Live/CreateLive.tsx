import React, { FunctionComponent, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Prompt } from 'react-router-dom'

import TextInput from '../../../../components/Common/TextInput'
import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import WaitingLiveFooter from './WaitingLiveFooter/WaitingLiveFooter'
import LiveVideo from './LiveVideo/LiveVideo'
import OnAirLiveFooter from './OnAirLiveFooter/OnAirLiveFooter'
import useLive from '../../../../hooks/useLive'
import LiveChat from 'components/LiveChat/LiveChat'
import { send } from 'process'

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

  useEffect(() => {
    if (videoRef.current) {
      const video: any = videoRef.current
      video.scrollIntoView({ behavior: 'smooth' })
    }
  }, [liveStatus])

  useEffect(() => {
    return () => {
      stopLive()
    }
  }, [])

  const startLive = () => {
    publish()
  }

  const stopLive = () => {
    stop()
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
        {liveStatus === 'WAITING' && <WaitingLiveFooter disabled={availableDevices.length === 0} startLive={startLive} />}

        {liveStatus === 'ON_AIR' && (
          <OnAirLiveFooter stopLive={stopLive} audioStatus={audioStatus} changeAudioStatus={audioToggle} />
        )}
      </div>

      <div className="widget-box no-padding">
        <LiveChat ref={chatRef} sendMessageChat={sendMessageChat} />
      </div>
    </>
  )
}

export default CreateLive
