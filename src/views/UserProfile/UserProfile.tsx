import React, { FunctionComponent } from 'react'

import LayoutMain from '../LayoutMain/LayoutMain'
import Profile from './Profile/Profile'

import { UserProfileContextProvider } from '../../context/UserProfileContext'

const UserProfile: FunctionComponent<{}> = () => {
  return (
    <>
      <LayoutMain>
        <UserProfileContextProvider>
          <Profile />
        </UserProfileContextProvider>
      </LayoutMain>
      )
    </>
  )
}

export default UserProfile
