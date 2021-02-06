import React, { FunctionComponent } from 'react'
import LayoutMain from '../LayoutMain/LayoutMain'
import AccountInfo from './AccountInfo/AccountInfo'
import ChangePassword from './ChangePassword/ChangePassword'
import AccountDevices from './AccountDevices/AccountDevices'

const Account: FunctionComponent<{}> = () => {
  return (
    <LayoutMain>
      <div className="content-grid">
        <div className="grid grid-2-8-2">
          <AccountInfo />

          <ChangePassword />

          <AccountDevices />
        </div>
      </div>
    </LayoutMain>
  )
}

export default Account
