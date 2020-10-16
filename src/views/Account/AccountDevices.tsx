import React, { FunctionComponent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { listDevicesSelector } from '../../redux/Auth/AuthSelectors'
import { getListDevices } from '../../redux/Auth/AuthThunks'

import { unixTimestampToDate } from '../../utils/Helpers'

import LayoutMain from '../LayoutMain/LayoutMain'
import AccountSidebar from './AccountSidebar/AccountSidebar'

import UserService from '../../services/UserService'

interface RenderTableProps {
  devices: any
}

const RenderTableData = (props: RenderTableProps) => {
  const { devices } = props
  const dispatch = useDispatch()
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
      UserService.removeDevice(deviceKey).then((response) => {
        if (response.status === 200) {
          dispatch(getListDevices())
          alert('Device deleted')
        } else {
          alert('Error to delete device')
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

  const dispatch = useDispatch()

  const myDevices = useSelector(listDevicesSelector)

  useEffect(() => {
    dispatch(getListDevices())
  }, [dispatch])

  return (
    <LayoutMain>
      <div className="content-grid">
        <div className="grid grid-3-9">
          <AccountSidebar />

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
                        <RenderTableData devices={myDevices} />
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}

export default AccountDevices
