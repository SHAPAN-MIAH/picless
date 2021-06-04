import React, { FunctionComponent } from 'react'

import NotificationsRoutes from './Notification/NotificationsRoutes'

export enum NotificationsTabs {
  All = 'all',
  Likes = 'likes',
  Subscriber = 'subscriber',
  Money = 'Money',
  Alerts = 'Alerts',
  Settings = 'Settings'
}

const NotificationsT: FunctionComponent<{}> = () => {
  return (
    <>
      <NotificationsRoutes />
    </>
  )
}

export default NotificationsT