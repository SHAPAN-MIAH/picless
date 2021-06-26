import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { unixTimestampToDate } from '../../../utils/Helpers'

import UserService from '../../../services/UserService'
import useAuth from '../../../hooks/useAuth'

import styles from './AccountDevices.module.css'

interface RenderTableProps {
  devices: any
  refresh: () => void
}

const RenderTableData = (props: RenderTableProps) => {
  const { devices, refresh } = props

  return devices.map((item: any) => {
    const deviceKey = item.DeviceKey
    const lastAuthentication = item.DeviceLastAuthenticatedDate

    const deviceName = item.DeviceAttributes.find((attr: any) => {
      return attr.Name === 'device_name'
    })

    const deviceIp = item.DeviceAttributes.find((attr: any) => {
      return attr.Name === 'last_ip_used'
    })

    const removeDevice = () => {
      const toastPromise = UserService.removeDevice(deviceKey)

      const toastOptions = {
        loading: 'Saving information ...',
        success: 'The device has been removed',
        error: 'There was a problem removing the device',
      }

      return toast.promise(toastPromise, toastOptions).then((response) => {
        if (response.status === 200) {
          refresh()
        } else {
          toast.error('There was a problem removing the device')
        }
      })
    }

    return (
      <tbody key={deviceKey}>
        <tr className={styles.deviceItem}>
          <th>Name</th>
          <td>{deviceName.Value}</td>
        </tr>

        <tr className={styles.deviceItem}>
          <th>Device IP</th>
          <td>{deviceIp.Value}</td>
        </tr>

        <tr className={styles.deviceItem}>
          <th className={styles.deviceItemTitle}>Last Seen</th>
          <td className={styles.deviceItemTitle}>{unixTimestampToDate(lastAuthentication)}</td>
        </tr>

        <tr className={`button small ${styles.deviceButton}`}>
          <span onClick={removeDevice}>
            Log Above Device Out
            <svg className="icon-delete">
              <use xlinkHref="#svg-delete" />
            </svg>
          </span>
        </tr>
      </tbody>
    )
  })
}

const AccountDevices: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { getDeviceList } = useAuth()

  const [myDevices, setMyDevices] = useState<any[]>([])

  useEffect(() => {
    refreshDevices()
  }, [])

  const refreshDevices = useCallback(() => {
    getDeviceList().then((list: any) => {
      setMyDevices(list)
    })
  }, [])

  return (
    <>
      <div className="account-hub-content">
        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">{t('accountDevices.devicesList')}</p>

            <div className="widget-box-content">
              {myDevices.length > 0 && (
                <table className="table">
                  <RenderTableData devices={myDevices} refresh={refreshDevices} />
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountDevices
