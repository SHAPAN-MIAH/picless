import React, { FunctionComponent } from 'react'

import Notifications from './Notifications'

export enum NotificationsTabs {
  All = 'all',
  Likes = 'likes',
  Subscriber = 'subscriber',
  Money = 'Money',
  Alerts = 'Alerts',
  Settings = 'Settings'
}

const Posts: FunctionComponent<{}> = () => {
  return (
    <>
      <Notifications />
    </>
  )
}

export default Posts