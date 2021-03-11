import React, { FunctionComponent } from 'react'
import Alert from '../../../../components/Common/Alerts/Alerts'

const BlockedContent: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="widget-box">
            <Alert
              alertType="PRIMARY"
              message="Subscribe to see the user content"
              style={{ width: '100%', textAlign: 'center' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BlockedContent
