import React, { useState, useEffect, FunctionComponent, useContext } from 'react'
import { Route, Switch, useHistory, useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import useRouter from '../../../hooks/useRouter'

import UserService from '../../../services/UserService'

import UserHeader from './Header/UserHeader'
import SectionMenu from './SectionMenu/SectionMenu'
import { ServiceUserProfileType } from '../../../types/UserType.d'
import AboutTab from './SectionTab/AboutTab'
// import LiveTab from './SectionTab/LiveTab'
import ProviderProfileContext from '../../../context/ProviderProfileContext'

export enum Tabs {
  POSTS = 'posts',
  PHOTOS = 'photos',
  VIDEOS = 'videos',
  ABOUT = 'about',
}

const defaultTab = Tabs.POSTS

const Profile: FunctionComponent<{}> = () => {
  const history = useHistory()
  const { username, tab } = useParams<{ username: string; tab: string }>()
  const router = useRouter()

  const { setProvider } = useContext(ProviderProfileContext.context)

  const [loading, setLoading] = useState<boolean>(false)
  const [isSuscribed, setIsSuscribed] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if (!username) {
      history.push('/user/not-exist')
    }
    UserService.getUserProfileByUserName(username).then((data: ServiceUserProfileType) => {
      if (data.code !== '0') {
        if (data.code === '1') {
          history.push('/user/not-exist')
        } else {
          history.push('/error')
        }
      } else {
        setLoading(false)

        setProvider(data.user)

        setIsSuscribed(data.isSuscribe)

        if (!tab) {
          router.push(`/user/${username}/${defaultTab}`)
        }

        if (window.tpl) {
          window.tpl.load(['user-avatar'])
        }
      }
    })
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
            <UserHeader isSuscribe={isSuscribed} />

            <SectionMenu />

            <Switch>
              <Route
                path={`/user/${username}/${Tabs.POSTS}`}
                render={() => {
                  return (
                    <div className="grid">
                      <div className="grid-column">
                        <div className="widget-box">
                          <h3>POSTS</h3>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
              <Route
                path={`/user/${username}/${Tabs.PHOTOS}`}
                render={() => {
                  return (
                    <div className="grid">
                      <div className="grid-column">
                        <div className="widget-box">
                          <h3>PHOTOS</h3>
                        </div>
                      </div>
                    </div>
                  )
                }}
              />
              <Route
                path={`/user/${username}/${Tabs.VIDEOS}`}
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

              <Route path={`/user/${username}/${Tabs.ABOUT}`} component={AboutTab} />
            </Switch>
          </>
        )}
      </div>
    </>
  )
}

export default Profile
