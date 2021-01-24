import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './OnAirLiveFooter.module.css'

const OnAirLiveFooter: FunctionComponent<{ stopLive: () => void }> = (props) => {
  const { stopLive } = props

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
        <div className={classNames('post-option-wrap', style.stopLiveButton)} onClick={stopLive}>
          <div className={classNames('post-option reaction-options-dropdown-trigger')}>
            <FontAwesomeIcon icon="stop-circle" />
            <p className="post-option-text " style={{ marginLeft: '10px' }}>
              Stop Live
            </p>
          </div>
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
