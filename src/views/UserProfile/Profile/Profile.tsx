import React, { FunctionComponent } from 'react'
import Loader from 'react-loader-spinner'
import useProfile from '../../../hooks/useProfile'
import UserHeader from './Header/UserHeader'
import ProfileRoutes from './ProfileRoutes'
import SectionMenu from './SectionMenu/SectionMenu'

const Profile: FunctionComponent<{}> = () => {
  const { loading, isSubscribed, provider } = useProfile()

  return (
    <>
      <div className="content-grid">
        {loading && !provider && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
              <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
            </div>
          </>
        )}
        {!loading && provider && (
          <>
            <UserHeader isSubscribed={isSubscribed} />

            <SectionMenu />

            <ProfileRoutes isSubscribed={isSubscribed} />
          </>
        )}
      </div>
    </>
  )
}

export default Profile
