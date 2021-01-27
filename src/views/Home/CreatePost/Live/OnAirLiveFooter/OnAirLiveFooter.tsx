import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './OnAirLiveFooter.module.css'

type OnAirLiveFooterProps = { stopLive: () => void; audioStatus: boolean; changeAudioStatus: () => void }

const OnAirLiveFooter: FunctionComponent<OnAirLiveFooterProps> = (props) => {
  const { stopLive, audioStatus, changeAudioStatus } = props

  return (
    <>
      <div className="widget-box-status-content">
        <div className="content-actions" style={{ flexDirection: 'row-reverse' }}>
          <div className="content-action">
            <div className="meta-line">
              <p className="meta-line-link">2 Comments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="post-options">
        <div className={classNames('post-option', style.stopLiveButton)} onClick={stopLive}>
          <FontAwesomeIcon icon="stop-circle" />
          <p className="post-option-text " style={{ marginLeft: '10px' }}>
            Stop Live
          </p>
        </div>

        <div className="post-option" onClick={changeAudioStatus}>
          {audioStatus && (
            <>
              <FontAwesomeIcon icon="microphone" color="#adafca" />

              <p className="post-option-text " style={{ marginLeft: '10px' }}>
                Mute
              </p>
            </>
          )}

          {!audioStatus && (
            <>
              <FontAwesomeIcon icon="microphone-slash" color="tomato" />

              <p className="post-option-text " style={{ marginLeft: '10px' }}>
                Unmute
              </p>
            </>
          )}
        </div>

        <div className="post-option">
          <svg className="post-option-icon icon-comment">
            <use xlinkHref="#svg-comment" />
          </svg>

          <p className="post-option-text">Chat</p>
        </div>
      </div>
    </>
  )
}

export default OnAirLiveFooter
