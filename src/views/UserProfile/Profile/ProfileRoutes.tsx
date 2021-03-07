import React, { FunctionComponent } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Tabs } from '../../../hooks/useProfile'
import useRouter from '../../../hooks/useRouter'
import AboutTab from './SectionTab/AboutTab'
import BlockedContent from './SectionTab/BlockedContent'
import Newsfeed from './SectionTab/Newsfeed'
import PhotoGallery from './SectionTab/PhotoGalleryTab'
import VideoGalleryTab from './SectionTab/VideoGalleryTab'

type ProfileRoutesProps = {
  isSubscribed: boolean
  // username: string
}

const ProfileRoute: FunctionComponent<ProfileRoutesProps> = (props) => {
  const { isSubscribed } = props
  const { match } = useRouter()
  return (
    <>
      {isSubscribed && (
        <>
          <Switch>
            <Route path={`${match.path}/${Tabs.POSTS}`} component={Newsfeed} />
            <Route path={`${match.path}/${Tabs.PHOTOS}`} component={PhotoGallery} />
            <Route path={`${match.path}/${Tabs.VIDEOS}`} component={VideoGalleryTab} />
            <Route path={[`${match.path}/${Tabs.ABOUT}`]} component={AboutTab} />
            <Route
              path={`${match.path}/`}
              render={() => {
                if (isSubscribed) {
                  return <Redirect to={`${match.url}/${Tabs.POSTS}`} />
                }
                return <Redirect to={`${match.url}/${Tabs.ABOUT}`} />
              }}
            />
          </Switch>
        </>
      )}

      {!isSubscribed && (
        <>
          <Switch>
            <Route
              path={[`${match.path}/${Tabs.POSTS}`, `${match.path}/${Tabs.PHOTOS}`, `${match.path}/${Tabs.VIDEOS}`]}
              component={BlockedContent}
            />
            <Route path={[`${match.path}/${Tabs.ABOUT}`]} component={AboutTab} />
            <Route
              path={`${match.path}/`}
              render={() => {
                if (isSubscribed) {
                  return <Redirect to={`${match.url}/${Tabs.POSTS}`} />
                }
                return <Redirect to={`${match.url}/${Tabs.ABOUT}`} />
              }}
            />
          </Switch>
        </>
      )}
    </>
  )
}

export default ProfileRoute
