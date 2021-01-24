import React, { FunctionComponent, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import TextInput from '../../../../components/Common/TextInput'
import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import WaitingLiveFooter from './WaitingLiveFooter/WaitingLiveFooter'
import LiveVideo from './LiveVideo/LiveVideo'
import OnAirLiveFooter from './OnAirLiveFooter/OnAirLiveFooter'
import useLive from '../../../../hooks/useLive'

const CreateLive: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { videoRef, availableDevices, changeVideoDevice, liveStatus, publish, stop } = useLive()

  const [liveName, setLiveName] = useState<string>('')

  useEffect(() => {
    if (videoRef.current) {
      const video: any = videoRef.current
      video.scrollIntoView({ behavior: 'smooth' })
    }
  }, [liveStatus])

  const startLive = () => {
    publish()
  }

  const stopLive = () => {
    stop()
  }

  // const goFullScreen = () => {
  //   if (videoRef.current) {
  //     const video: any = videoRef.current

  //     if (video.requestFullscreen) {
  //       video.requestFullscreen()
  //     } else if (video.mozRequestFullScreen) {
  //       video.mozRequestFullScreen() // Firefox
  //     } else if (video.webkitRequestFullscreen) {
  //       video.webkitRequestFullscreen() // Chrome
  //     } else if (video.webkitEnterFullscreen) {
  //       video.webkitEnterFullscreen() // Safari
  //     } else {
  //       alert('nada')
  //     }
  //   }
  // }

  return (
    <>
      <div className="quick-post-body">
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

        {liveStatus === 'ON_AIR' && <OnAirLiveFooter stopLive={stopLive} />}
      </div>
    </>
  )
}

export default CreateLive
