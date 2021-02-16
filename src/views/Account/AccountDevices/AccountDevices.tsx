import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { unixTimestampToDate } from '../../../utils/Helpers'

import UserService from '../../../services/UserService'
import useAuth from '../../../hooks/useAuth'

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
      <tr key={deviceKey}>
        <td>{deviceName.Value}</td>
        <td>{deviceIp.Value}</td>
        <td>{unixTimestampToDate(lastAuthentication)}</td>
        <td>
          <a href="#/" onClick={removeDevice}>
            <svg className="icon-delete">
              <use xlinkHref="#svg-delete" />
            </svg>
          </a>
        </td>
      </tr>
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
        <div className="section-header">
          <div className="section-header-info">
            <p className="section-pretitle">{t('accountDevices.devicesTitle')}</p>

            <h2 className="section-title">{t('accountDevices.devicesSubTitle')}</h2>
          </div>
        </div>

        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">{t('accountDevices.devicesList')}</p>

            <div className="widget-box-content">
              {myDevices.length > 0 && (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Ip v6</th>
                      <th scope="col">Last Seen</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <RenderTableData devices={myDevices} refresh={refreshDevices} />
                  </tbody>
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