import React, { FunctionComponent } from 'react'

import Profile from './Profile/Profile'

import { ProviderProfileContextProvider } from '../../context/ProviderProfileContext'

const UserProfile: FunctionComponent<{}> = () => {
  return (
    <>
      <ProviderProfileContextProvider>
        <Profile />
      </ProviderProfileContextProvider>
    </>
  )
}

export default UserProfile
