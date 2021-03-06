import React, { FunctionComponent } from 'react'

import NotificationsRoutes from './NotificationsRoutes'

export enum NotificationsTabsNames {
  ALL = 'all',
  LIKES = 'likes',
  SUSCRIBER = 'subscriber',
  MONEY = 'money',
  ALERTS = 'alerts',
  SETTINGS = 'settings',
}

const NotificationsTabs: FunctionComponent<{}> = () => {
  return (
    <>
      <NotificationsRoutes />
    </>
  )
}

export default NotificationsTabs
