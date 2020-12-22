import React, { useState, useEffect, FunctionComponent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import UserService from '../../services/UserService'

import LayoutMain from '../LayoutMain/LayoutMain'
import UserHeader from './Header/UserHeader'
import SectionMenu, { TabNamesType } from './SectionMenu/SectionMenu'
import { UserProfileType, ServiceUserProfileType } from '../../types/UserType.d'
import AboutTab from './SectionTab/AboutTab'

const UserProfile: FunctionComponent<{}> = () => {
  const history = useHistory()
  const { username } = useParams<{ username: string }>()

  const [userData, setUserData] = useState<UserProfileType>({} as UserProfileType)
  const [loading, setLoading] = useState<boolean>(false)
  const [isSuscribed, setIsSuscribed] = useState<boolean>(false)
  const [selectedTab, setSelectedTab] = useState<TabNamesType>('ABOUT')

  useEffect(() => {
    setLoading(true)
    UserService.getUserProfileByUserName(username).then((data: ServiceUserProfileType) => {
      if (data.code !== '0') {
        history.push('/error')
      } else {
        setLoading(false)
        setUserData(data.user)
        setIsSuscribed(data.isSuscribe)

        if (window.tpl) {
          window.tpl.load(['user-avatar', 'liquidify'])
        }
      }
    })
  }, [])

  const changeTab = (tab: TabNamesType) => {
    setSelectedTab(tab)
  }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          {loading && <h1>Loading ...</h1>}
          {!loading && (
            <>
              <UserHeader user={userData} isSuscribe={isSuscribed} />

              <SectionMenu onChangeTab={changeTab} selectedTab={selectedTab} />

              {selectedTab === 'ABOUT' && <AboutTab user={userData} />}

              {selectedTab === 'POSTS' && (
                <div className="grid">
                  <div className="grid-column">
                    <div className="widget-box">
                      <h3>POSTS</h3>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === 'PHOTOS' && (
                <div className="grid">
                  <div className="grid-column">
                    <div className="widget-box">
                      <h3>PHOTOS</h3>{' '}
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
      </LayoutMain>
      )
    </>
  )
}

export default UserProfile
