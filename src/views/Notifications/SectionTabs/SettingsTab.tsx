import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import UserAvatar from '../../../components/UserAvatar'
import { NotificationType } from '../../../types/NotificationType'
import useNotifications from '../../../hooks/useNotification'
import UserSettings from 'views/Account/UserSettings'

const SettingsTab: FunctionComponent<{}> = () => {
  const { notifications } = useNotifications()
  return (
    <div className='settings-tab' style={{ marginTop: '10px' }}>
      <UserSettings/>
    </div>
  )
}

export default SettingsTab