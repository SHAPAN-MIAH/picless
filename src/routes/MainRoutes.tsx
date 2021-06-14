import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Discover from '../views/Discover/Discover'
import CreatePost from '../views/CreatePost/CreatePost'
import HelpSupport from '../views/HelpCenter/HelpCenter'
import AuthorizationContext from '../context/AuthorizationContext'
import AddCard from '../views/Account/Card/AddCard'
import Movements from '../views/Account/Movements'
import AddBank from '../views/Account/Verification/AddBank/AddBank'
import Contact from '../views/HelpCenter/Contact/Contact'
import Faq from '../views/HelpCenter/Faq/Faq'
import PrivacyPolicy from '../views/HelpCenter/PrivacyPolicy/PrivacyPolicy'
import TermsAndConditions from '../views/HelpCenter/TermsAndCondition/TermsAndCondition'
import Home from '../views/Home/Home'
import SinglePost from '../views/Home/SinglePost'
import LayoutMain from '../views/LayoutMain/LayoutMain'
import Authorization from '../views/Authorization/Authorization'
import PaymentCallback from '../views/Payments/PaymentCallback'
import TestView from '../views/TestView/TestView'
import img from '../views/TestView/Img'
import Metrics from '../views/Metrics/Metrics'
import Notification from '../views/Notifications/Notifications'
import UserProfile from '../views/UserProfile/UserProfile'
import routes from './MenuRoutes'
import ProtectedRoute, { ProtectedRouteProps } from './ProtectedRoute'
import ChatMain from 'views/MessagesNew/ChatMain'
// import PhotoGallery from 'components/LiveSectionFeatures/PhotoGallery/PhotoGallery'
// import VideoGallery from 'components/LiveSectionFeatures/VideoGallery/VideoGallery'
// import About from 'components/LiveSectionFeatures/About/About'

const NoMatchPage = () => {
  return (
    <>
      <div style={{ paddingLeft: '180px' }}>
        <h3>404 - Not found</h3>
        <a href="/user/home">Go to home</a>
      </div>
    </>
  )
}

const MainRoutes: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useContext(AuthorizationContext.context)

  const routerProps: ProtectedRouteProps = {
    authenticationPath: '/#login',
  }

  return (
    <>
      <Router>
        {isAuthenticated && (
          <LayoutMain>
            <Switch>
              {routes.map((route) => {
                if (route.component) {
                  return (
                    <ProtectedRoute
                      {...routerProps}
                      title={t(route.title)}
                      key={`${route.name}`}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  )
                }

                return null
              })}

              <ProtectedRoute {...routerProps} exact path="/wallet/payments/add-card" component={AddCard} />
              <ProtectedRoute {...routerProps} exact path="/wallet/movements" component={Movements} />

              {/* <ProtectedRoute {...routerProps} path="/payment/stripe/wallet" component={PaymentCallback} /> */}
              <ProtectedRoute {...routerProps} path="/payment/stripe/unblock" component={PaymentCallback} />
              <ProtectedRoute {...routerProps} path="/payment/stripe/tip" component={PaymentCallback} />
              <ProtectedRoute {...routerProps} path="/payment/stripe/subscription" component={PaymentCallback} />

              <ProtectedRoute {...routerProps} path="/user/home" component={Home} />

              <ProtectedRoute {...routerProps} exact path={['/user/chat', '/user/chat/:userid']} component={ChatMain} />

              <ProtectedRoute {...routerProps} exact path="/user/create-post" component={CreatePost} />

              <ProtectedRoute {...routerProps} path="/user/notification" component={Notification} />

              <ProtectedRoute {...routerProps} exact path="/user/discover" component={Discover} />

              <ProtectedRoute {...routerProps} exact path="/account/add-bank" component={AddBank} />

              <ProtectedRoute {...routerProps} path="/u/:username/post/:id" exact component={SinglePost} />

              <ProtectedRoute {...routerProps} path="/u/:username/metrics" exact component={Metrics} />

              <ProtectedRoute {...routerProps} path="/u/:username" component={UserProfile} />
        
              {/* <ProtectedRoute
                {...routerProps}
                path={['/u/:username', '/u/:username/', '/u/:username/:tab']}
                component={UserProfile}
              />
              <ProtectedRoute {...routerProps} exact path={['/u/not-exist']} component={ProfileNotExist} /> */}

              <Route {...routerProps} exact path="/testviewd" component={TestView} />

              <Route path="/support/faq" component={Faq} />
              <Route path="/support/contact" component={Contact} />
              <Route path="/support/privacy" component={PrivacyPolicy} />
              <Route path="/support/terms-conditions" component={TermsAndConditions} />
              
              <Route path="/">
                <Redirect to="/user/home/timeline" />
              </Route>
              <Route component={NoMatchPage} />
            </Switch>
          </LayoutMain>
        )}
        {!isAuthenticated && (
          <Switch>
            <Route exact path="/">
              <Authorization />
            </Route>
            <Route path="/support/faq" component={Faq} />
            <Route path="/support/contact" component={Contact} />
            <Route path="/support/privacy" component={PrivacyPolicy} />
            <Route path="/support/terms-conditions" component={TermsAndConditions} />
            <Route path="/support" component={HelpSupport} />

            <Route path="/">
              <h1>ERROR</h1>
            </Route>
          </Switch>
        )}
      </Router>
    </>
  )
}

export default MainRoutes
