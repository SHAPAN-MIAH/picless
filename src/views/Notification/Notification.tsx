import React, { FunctionComponent } from 'react'

const Notification: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid grid-3-6-3 mobile-prefer-content">
          <div className="grid-column">{'  '}</div>
          <div className="grid-column">
            <h1>Notification Page</h1>
          </div>
          <div className="grid-column">{'  '}</div>
        </div>
      </div>
    </>
  )
}

export default Notification
