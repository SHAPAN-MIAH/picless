import React, { FunctionComponent, useEffect } from 'react'
import { Link } from 'react-router-dom'

import useNotifications from '../../hooks/useNotification'

import Notification from './Notification/Notification'

const Notifications: FunctionComponent<{}> = () => {
  const { notifications } = useNotifications()

  useEffect(() => {
    window.tpl.load(['sidebar'])
  }, [])

  return (
    <>
      <div className="content-grid" style={{ maxWidth: '800px' }}>
        <div className="grid grid-2-7-2">
          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">My profile</p>

                <h2 className="section-title">Notifications</h2>
              </div>
              <div className="section-header-actions">
                <p className="section-header-action">Mark all as Read</p>

                <Link to="/account/settings" className="section-header-action">
                  Settings
                </Link>
              </div>
            </div>

            <div className="grid-column">
              <div className="notification-box-list">
                {notifications.map((notification) => {
                  return <Notification key={notification.id} notification={notification} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
