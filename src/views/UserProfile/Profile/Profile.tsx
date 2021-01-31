import React, { useState, useEffect, FunctionComponent, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import UserService from '../../../services/UserService'

import UserHeader from './Header/UserHeader'
import SectionMenu, { TabNamesType } from './SectionMenu/SectionMenu'
import { ServiceUserProfileType } from '../../../types/UserType.d'
import AboutTab from './SectionTab/AboutTab'
import LiveTab from './SectionTab/LiveTab'
import UserProfileContext from '../../../context/UserProfileContext'

const Profile: FunctionComponent<{}> = () => {
  const history = useHistory()
  const { username } = useParams<{ username: string }>()

  const { setUserProfile } = useContext(UserProfileContext.context)

  const [loading, setLoading] = useState<boolean>(false)
  const [isSuscribed, setIsSuscribed] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<TabNamesType>('LIVE')

  useEffect(() => {
    setLoading(true)

    UserService.getUserProfileByUserName(username).then((data: ServiceUserProfileType) => {
      if (data.code !== '0') {
        history.push('/error')
      } else {
        setLoading(false)

        setUserProfile(data.user)

        setIsSuscribed(data.isSuscribe)

        if (window.tpl) {
          window.tpl.load(['user-avatar'])
        }
      }
    })
  }, [username])

  const changeTab = (tab: TabNamesType) => {
    setSelectedTab(tab)
  }

  return (
    <>
      <div className="content-grid">
        {loading && <h1>Loading ...</h1>}
        {!loading && (
          <>
            <UserHeader isSuscribe={isSuscribed} />

            <SectionMenu onChangeTab={changeTab} selectedTab={selectedTab} />

            {selectedTab === 'ABOUT' && <AboutTab />}

            {selectedTab === 'POSTS' && (
              <div className="grid">
                <div className="grid-column">
                  <div className="widget-box">
                    <h3>POSTS</h3>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'LIVE' && <LiveTab />}

            {selectedTab === 'PHOTOS' && (
              <div className="grid">
                <div className="grid-column">
                  <div className="widget-box">
                    <h3>PHOTOS</h3>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'VIDEOS' && (
              <div className="grid">
                <div className="grid-column">
                  <div className="widget-box">
                    <h3>VIDEOS</h3>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      )
    </>
  )
}

export default Profile
