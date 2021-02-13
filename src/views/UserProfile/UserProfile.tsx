import React, { FunctionComponent } from 'react'

import LayoutMain from '../LayoutMain/LayoutMain'
import Profile from './Profile/Profile'

import { ProviderProfileContextProvider } from '../../context/ProviderProfileContext'

const UserProfile: FunctionComponent<{}> = () => {
  return (
    <>
      <LayoutMain>
        <ProviderProfileContextProvider>
          <Profile />
        </ProviderProfileContextProvider>
      </LayoutMain>
      )
    </>
  )
}

export default UserProfile
