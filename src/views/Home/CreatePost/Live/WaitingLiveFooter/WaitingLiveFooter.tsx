import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import CheckboxForm from '../../../../../components/Common/CheckboxForm'

const WaitingLiveFooter: FunctionComponent<{ startLive: () => void; disabled: boolean; onToggleChat: () => void }> = (
  props
) => {
  const { startLive, disabled, onToggleChat } = props

  return (
    <>
      <div className="post-options">
        <div style={{ flex: 2 }}>
          <CheckboxForm
            id="allow-chat"
            title="Allow chat"
            checked
            onChange={() => {
              onToggleChat()
            }}
          />
        </div>
        <div style={{ flex: 3 }}> </div>
        <div style={{ flex: 3 }}>
          <button
            type="button"
            className={classNames('button small', disabled ? 'disabled' : 'primary')}
            onClick={startLive}
            disabled={disabled}
          >
            <FontAwesomeIcon icon="satellite-dish" />
            Go Live
          </button>
        </div>
      </div>
    </>
  )
}

export default WaitingLiveFooter
