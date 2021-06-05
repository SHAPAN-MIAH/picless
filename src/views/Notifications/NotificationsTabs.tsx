import React, { FunctionComponent } from 'react'

import NotificationsRoutes from './Notification/NotificationsRoutes'

export enum NotificationsTabs {
  ALL = 'all',
  LIKES = 'likes',
  SUSCRIBER = 'subscriber',
  MONEY = 'money',
  ALERTS = 'alerts',
  SETTINGS = 'settings'
}

const NotificationsT: FunctionComponent<{}> = () => {
  return (
    <>
      <NotificationsRoutes />
    </>
  )
}

export default NotificationsT