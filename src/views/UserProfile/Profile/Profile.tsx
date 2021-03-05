import React, { useEffect, FunctionComponent } from 'react'
import { Route, Switch, useHistory, useParams, Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import UserHeader from './Header/UserHeader'
import SectionMenu from './SectionMenu/SectionMenu'

import AboutTab from './SectionTab/AboutTab'
// import LiveTab from './SectionTab/LiveTab'

import Newsfeed from './SectionTab/Newsfeed'
import useProfile, { Tabs } from '../../../hooks/useProfile'
import PhotoGallery from './SectionTab/PhotoGallery'

const Profile: FunctionComponent<{}> = () => {
  const history = useHistory()
  const { username } = useParams<{ username: string; tab: string }>()
  const { loading, isSubscribed } = useProfile()

  useEffect(() => {
    if (!username) {
      history.push('/user/not-exist')
    }
  }, [username])

  return (
    <>
      <div className="content-grid">
        {loading && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
              <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
            </div>
          </>
        )}
        {!loading && (
          <>
            <UserHeader isSuscribe={isSubscribed} />

            <SectionMenu />

            <Switch>
              <Route path={`/user/${username}/${Tabs.POSTS}`} component={Newsfeed} />
              <Route path={`/user/${username}/${Tabs.PHOTOS}`} exact component={PhotoGallery} />
              <Route
                path={`/user/${username}/${Tabs.VIDEOS}`}
                exact
                render={() => {
                  return (
                    <div className="grid">
                      <div className="grid-column">
                        <div className="widget-box">
                          <h3>VIDEOS</h3>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />

              <Route path={`/user/${username}/${Tabs.ABOUT}`} exact component={AboutTab} />
              <Route path={`/user/${username}/`} render={() => <Redirect to={`/user/${username}/${Tabs.ABOUT}`} />} />
            </Switch>
          </>
        )}
      </div>
    </>
  )
}

export default Profile
