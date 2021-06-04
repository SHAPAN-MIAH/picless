import React, { FunctionComponent } from 'react'

import NotificationsRoutes from './Notification/NotificationsRoutes'

export enum NotificationsTabs {
  All = 'all',
  Likes = 'likes',
  Subscriber = 'subscriber',
  Money = 'money',
  Alerts = 'alerts',
  Settings = 'settings'
}

const NotificationsT: FunctionComponent<{}> = () => {
  return (
    <>
      <NotificationsRoutes />
    </>
  )
}

export default NotificationsT