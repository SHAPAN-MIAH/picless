import React, { FunctionComponent } from 'react'
import Loader from 'react-loader-spinner'
import { Redirect, Route, Switch } from 'react-router-dom'
import { SubscriptionType } from '../../../types/UserType'
import { Tabs } from '../../../hooks/useProfile'
import useRouter from '../../../hooks/commons/useRouter'


const Newsfeed = React.lazy(() => import('./SectionTab/NewsfeedTab'))
const PhotoGalleryTab = React.lazy(() => import('./SectionTab/PhotoGalleryTab'))
const VideoGalleryTab = React.lazy(() => import('./SectionTab/VideoGalleryTab'))
const AboutTab = React.lazy(() => import('./SectionTab/AboutTab'))
const BlockedContent = React.lazy(() => import('./SectionTab/BlockedContent'))
const About = React.lazy(() => import('../../../components/LiveSectionFeatures/About/About'))
const PhotoGallery = React.lazy(() => import('../../../components/LiveSectionFeatures/PhotoGallery/PhotoGallery'))
const VideoGallery = React.lazy(() => import('../../../components/LiveSectionFeatures/VideoGallery/VideoGallery'))


type ProfileRoutesProps = {
  subscription: SubscriptionType | null
  isOwner: boolean
  // username: string
}

const Loading = (
  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const ProfileRoute: FunctionComponent<ProfileRoutesProps> = (props) => {
  const { subscription, isOwner } = props
  const { match } = useRouter()

  return (
    <>
      {(subscription || isOwner) && (
        <>
          <React.Suspense fallback={Loading}>
            <Switch>
              <Route path={`${match.path}/${Tabs.POSTS}`} component={Newsfeed} />
              <Route path={`${match.path}/${Tabs.PHOTOS}`} component={PhotoGalleryTab} />
              <Route path={`${match.path}/${Tabs.VIDEOS}`} component={VideoGalleryTab} />
              <Route path={[`${match.path}/${Tabs.ABOUT}`]} component={AboutTab} />
              <Route path={[`${match.path}/${Tabs.ABOUT}`]} component={About} />
              <Route path={[`${match.path}/${Tabs.ABOUT}`]} component={PhotoGallery} />
              <Route path={[`${match.path}/${Tabs.ABOUT}`]} component={VideoGallery} />
              <Route
                path={`${match.path}/`}
                render={() => {
                  if (subscription || isOwner) {
                    return <Redirect to={`${match.url}/${Tabs.POSTS}`} />
                  }
                  return <Redirect to={`${match.url}/${Tabs.ABOUT}`} />
                }}
              />
            </Switch>
          </React.Suspense>
        </>
      )}

      {!subscription && !isOwner && (
        <>
          <React.Suspense fallback={Loading}>
            <Switch>
              <Route
                path={[`${match.path}/${Tabs.POSTS}`, `${match.path}/${Tabs.PHOTOS}`, `${match.path}/${Tabs.VIDEOS}`]}
                component={BlockedContent}
              />
              <Route path={[`${match.path}/${Tabs.ABOUT}`]} component={AboutTab} />

              <Route
                path={`${match.path}/`}
                render={() => {
                  return <Redirect to={`${match.url}/${Tabs.ABOUT}`} />
                }}
              />
            </Switch>
          </React.Suspense>
        </>
      )}
    </>
  )
}

export default ProfileRoute
