import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import ProtectedRoute, { ProtectedRouteProps } from './routes/ProtectedRoute'

import { checkUserAuthenticated } from './redux/Auth/AuthThunks'

import LayoutUnauthorize from './views/LayoutUnauthorize/LayoutUnauthorize'
import AccountInfo from './views/Account/AccountInfo'
import ProfileInfo from './views/Account/ProfileInfo'
import AccountDevices from './views/Account/AccountDevices'
import ChangePassword from './views/Account/ChangePassword'
import UserProfile from './views/UserProfile/UserProfile'
import Messages from './views/Messages/Messages'
import UserSettings from './views/Account/UserSettings'
import Home from './views/Home/Home'

import WalletOverview from './views/Account/WalletOverview'
import Movements from './views/Account/Movements'
import PaymentMethods from './views/Account/PaymentMethods'
import AddCard from './views/Account/Card/AddCard'
import Subscriptions from './views/Account/Subscriptions/Subscriptions'
import AddFounds from './views/Account/AddFounds'
import PublisherTest from './views/Lives/BroadcastPublisher/publisherTest'
import Viewer from './views/Lives/BroadcastViewer/Viewer'

import './utils/Icons'

import './assets/css/vendor/bootstrap.min.css'
import './assets/css/vendor/simplebar.css'
import './assets/css/vendor/tiny-slider.css'
import './assets/css/styles.min.css'
import 'reactjs-popup/dist/index.css'
import './App.css'

import PublisherTest2 from './views/Lives/BroadcastPublisher/publisherTest2'

declare global {
  interface Window {
    tpl: { core: any; plugin: any; load: (modulesNames?: string[]) => void }
    stream: any
    soundMeter: any
    Securionpay: any
  }
}

function App() {
  const dispatch = useDispatch()

  const routerProps: ProtectedRouteProps = {
    authenticationPath: '/',
  }

  useEffect(() => {
    dispatch(checkUserAuthenticated())
  }, [dispatch])

  return (
    <>
      <Router>
        <Switch>
          <ProtectedRoute {...routerProps} exact path="/account/account-info" component={AccountInfo} />
          <ProtectedRoute {...routerProps} exact path="/account/profile-info" component={ProfileInfo} />
          <ProtectedRoute {...routerProps} exact path="/account/my-subscriptions" component={Subscriptions} />
          <ProtectedRoute {...routerProps} exact path="/account/account-devices" component={AccountDevices} />
          <ProtectedRoute {...routerProps} exact path="/account/change-password" component={ChangePassword} />
          <ProtectedRoute {...routerProps} exact path="/account/settings" component={UserSettings} />

          <ProtectedRoute {...routerProps} exact path="/wallet/overview" component={WalletOverview} />
          <ProtectedRoute {...routerProps} exact path="/wallet/payments" component={PaymentMethods} />
          <ProtectedRoute {...routerProps} exact path="/wallet/payments/add-card" component={AddCard} />
          <ProtectedRoute {...routerProps} exact path="/wallet/payments/add-founds" component={AddFounds} />
          <ProtectedRoute {...routerProps} exact path="/wallet/movements" component={Movements} />

          <ProtectedRoute {...routerProps} exact path="/user/home" component={Home} />
          <ProtectedRoute {...routerProps} exact path="/user/messages/:userid" component={Messages} />
          <ProtectedRoute {...routerProps} exact path="/user/messages" component={Messages} />
          <ProtectedRoute {...routerProps} exact path="/user/:username" component={UserProfile} />

          <ProtectedRoute {...routerProps} exact path="/live/test/publisher" component={PublisherTest} />
          <ProtectedRoute {...routerProps} exact path="/live/test/pub" component={PublisherTest2} />
          <ProtectedRoute {...routerProps} exact path="/live/test/viewer" component={Viewer} />

          <Route exact path="/">
            <LayoutUnauthorize />
          </Route>
          <Route path="/">
            <h1>ERROR</h1>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
