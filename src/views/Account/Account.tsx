import React, { FunctionComponent } from 'react'

import AccountInfo from './AccountInfo/AccountInfo'
import ChangePassword from './ChangePassword/ChangePassword'
import AccountDevices from './AccountDevices/AccountDevices'
import DeleteAccount from './DeleteAccount/DeleteAccount'

const Account: FunctionComponent<{}> = () => {
  return (
    <div className="content-grid">
      <div className="grid grid-2-8-2">
        <AccountInfo />

        <ChangePassword />

        <AccountDevices />

        <DeleteAccount />
      </div>
    </div>
  )
}

export default Account
