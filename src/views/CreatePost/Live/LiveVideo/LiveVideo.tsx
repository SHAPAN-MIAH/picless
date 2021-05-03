// import { isMobile } from 'react-device-detect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import style from './LiveVideo.module.css'


type LiveVideoProps = {
  // goFullScreen: () => void
  numberOfVideoDevices: number
  changeVideoDevice: () => void
}

const LiveVideo = React.forwardRef<HTMLVideoElement | null, LiveVideoProps>((props, ref) => {
  const { changeVideoDevice, numberOfVideoDevices, ...rest } = props
  return (
    <>
      <div className={style.container}>
        <video {...rest} ref={ref} autoPlay muted playsInline />

        {numberOfVideoDevices > 0 && (
          <div className={style.overlay}>
            <div className={style.videoTop}>
              {numberOfVideoDevices > 1 && (
                <div className={style.changeVideoDeviceButton} onClick={changeVideoDevice}>
                  <FontAwesomeIcon icon="sync-alt" size="lg" />
                </div>
              )}
            </div>
            <div className={style.videoCenter}> </div>
          </div>
        )}
        {numberOfVideoDevices === 0 && (
          <div className={style.overlay}>
            <p className={style.noDevices}>You don't have devices to make a live session</p>
          </div>
        )}
      </div>
    </>
  )
})

export default LiveVideo
