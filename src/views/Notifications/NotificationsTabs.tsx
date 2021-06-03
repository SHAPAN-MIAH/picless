import React, { FunctionComponent } from 'react'

import Notifications from './Notifications'

export enum NotificationsTabs {
  All = 'Notifications',
}

const Posts: FunctionComponent<{}> = () => {
  return (
    <>
      <Notifications />
    </>
  )
}

export default Posts