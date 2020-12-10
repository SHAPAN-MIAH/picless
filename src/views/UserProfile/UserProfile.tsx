import React, { useState, useEffect, FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import UserService from '../../services/UserService'

import LayoutMain from '../LayoutMain/LayoutMain'
import UserHeader from './Header/UserHeader'
import SectionMenu, { TabNamesType } from './SectionMenu/SectionMenu'
import Alert from '../../components/Common/Alerts/Alerts'
import { UserTimeLineType, UserInterestType, UserProfileType } from '../../types/UserType.d'

const UserProfile: FunctionComponent<{}> = () => {
  const { username } = useParams<{ username: string }>()

  const [userData, setUserData] = useState<UserProfileType>({} as UserProfileType)
  const [selectedTab, setSelectedTab] = useState<TabNamesType>('ABOUT')

  useEffect(() => {
    UserService.getUserProfileByUserName(username).then((data: UserProfileType) => {
      setUserData(data)
    })
  }, [username])

  const changeTab = (tab: TabNamesType) => {
    setSelectedTab(tab)
  }

  const noInterests = 'The user has not yet added interests.'
  const noTimeLineEvents = 'The user has not yet added events to the timeline.'

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <UserHeader user={userData} />

          <SectionMenu onChangeTab={changeTab} selectedTab={selectedTab} />

          {selectedTab === 'ABOUT' && (
            <div className="grid">
              <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-settings">
                    <div className="post-settings-wrap">
                      <div className="post-settings widget-box-post-settings-dropdown-trigger">
                        <svg className="post-settings-icon icon-more-dots">
                          <use xlinkHref="#svg-more-dots" />
                        </svg>
                      </div>

                      <div className="simple-dropdown widget-box-post-settings-dropdown">
                        <p className="simple-dropdown-link">Widget Settings</p>
                      </div>
                    </div>
                  </div>

                  <p className="widget-box-title">Interests</p>

                  <div className="widget-box-content">
                    <div className="information-block-list">
                      {userData.userInterest &&
                        userData.userInterest?.length > 0 &&
                        userData.userInterest?.map((interest: UserInterestType) => {
                          return (
                            <div key={interest.id} className="information-block">
                              <p className="information-block-title">{interest.name}</p>

                              <p className="information-block-text">{interest.description}</p>
                            </div>
                          )
                        })}

                      {userData.userInterest && userData.userInterest?.length === 0 && (
                        <Alert alertType="PRIMARY" message={noInterests} style={{ width: '100%' }} />
                      )}
                    </div>
                  </div>
                </div>

                <div className="widget-box">
                  <div className="widget-box-settings">
                    <div className="post-settings-wrap">
                      <div className="post-settings widget-box-post-settings-dropdown-trigger">
                        <svg className="post-settings-icon icon-more-dots">
                          <use xlinkHref="#svg-more-dots" />
                        </svg>
                      </div>

                      <div className="simple-dropdown widget-box-post-settings-dropdown">
                        <p className="simple-dropdown-link">Widget Settings</p>
                      </div>
                    </div>
                  </div>

                  <p className="widget-box-title">Timeline</p>

                  <div className="widget-box-content">
                    <div className="timeline-information-list">
                      {userData.userTimeLine &&
                        userData.userTimeLine?.length > 0 &&
                        userData.userTimeLine?.map((event: UserTimeLineType) => {
                          return (
                            <div key={event.id} className="timeline-information">
                              <p className="timeline-information-title">{event.title}</p>

                              <p className="timeline-information-date">{`${event.yearSarted} - ${event.yearEnded}`}</p>

                              <p className="timeline-information-text">
                                Lead Costume Designer for the Amazzo Costumes agency. Im in charge of a ten person group,
                                overseeing all the proyects and talking to potential clients. I also handle some face to face
                                interviews for new candidates.
                              </p>
                            </div>
                          )
                        })}

                      {userData.userTimeLine && userData.userTimeLine?.length === 0 && (
                        <Alert alertType="PRIMARY" message={noTimeLineEvents} style={{ width: '100%' }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'POSTS' && (
            <div className="grid">
              <div className="grid-column">
                <div className="widget-box"> </div>
              </div>
            </div>
          )}

          {selectedTab === 'FRIENDS' && (
            <div className="grid">
              <div className="grid-column">
                <div className="widget-box"> </div>
              </div>
            </div>
          )}

          {selectedTab === 'PHOTOS' && (
            <div className="grid">
              <div className="grid-column">
                <div className="widget-box"> </div>
              </div>
            </div>
          )}

          {selectedTab === 'VIDEOS' && (
            <div className="grid">
              <div className="grid-column">
                <div className="widget-box"> </div>
              </div>
            </div>
          )}
        </div>
      </LayoutMain>
      )
    </>
  )
}

export default UserProfile
