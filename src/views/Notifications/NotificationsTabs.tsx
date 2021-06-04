import React, { FunctionComponent } from 'react'

import NotificationsTabsContainer from './Notification/NotificationsTabsContainer'

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
      <NotificationsTabsContainer />
    </>
  )
}

export default NotificationsT