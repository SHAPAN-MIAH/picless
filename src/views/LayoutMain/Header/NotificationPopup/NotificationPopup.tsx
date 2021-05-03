<<<<<<< HEAD
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'

import useNotifications from '../../../../hooks/useNotification'

import Notification from './Notification/Notification'

const NotificationPopup: FunctionComponent<{}> = () => {
  const { notifications } = useNotifications()

  return (
    <>
      <div className="dropdown-box header-dropdown">
        <div className="dropdown-box-header">
          <p className="dropdown-box-header-title">Notifications</p>

          <div className="dropdown-box-header-actions">
            <p className="dropdown-box-header-action">Mark all as Read</p>
          </div>
        </div>

        <SimpleBar className="dropdown-box-list">
          {notifications.map((notification) => {
            return <Notification key={notification.id} notification={notification} />
          })}
        </SimpleBar>

        <Link to="/user/notification" className="dropdown-box-button secondary">
          View all Notifications
        </Link>
      </div>
    </>
  )
}

export default NotificationPopup
=======
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import SimpleBar from 'simplebar-react'

import useInterval from '../../../../hooks/commons/useInterval'
import useNotifications from '../../../../hooks/useNotification'

import Notification from './Notification/Notification'

const NotificationPopup: FunctionComponent<{}> = () => {
  const { getNotifications, notifications } = useNotifications()

  useInterval(() => {
    getNotifications()
  }, 300000)

  return (
    <>
      <div className="dropdown-box header-dropdown">
        <div className="dropdown-box-header">
          <p className="dropdown-box-header-title">Notifications</p>

          <div className="dropdown-box-header-actions">
            <p className="dropdown-box-header-action">Mark all as Read</p>
          </div>
        </div>

        <SimpleBar className="dropdown-box-list">
          {notifications.map((notification) => {
            return <Notification key={notification.id} notification={notification} />
          })}
        </SimpleBar>

        <Link to="/user/notification" className="dropdown-box-button secondary">
          View all Notifications
        </Link>
      </div>
    </>
  )
}

export default NotificationPopup
>>>>>>> stage-5
