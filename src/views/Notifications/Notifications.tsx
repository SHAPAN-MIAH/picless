import React, { FunctionComponent } from 'react'
import NotificationsT from './NotificationsTabs'

const Notifications: FunctionComponent<{}> = () => {
  return (
    <div className="content-grid" style={{ maxWidth: '800px'}}>
      <div className="grid grid-2-7-2 mobile-prefer-content">
        <div className="grid-column" />
        <div className="grid-column">
          <NotificationsT />
        </div>
        <div className="grid-column"> </div>
      </div>
    </div>
  )
}

export default Notifications
