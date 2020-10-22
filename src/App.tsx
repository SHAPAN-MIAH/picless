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
import UserSettings from './views/Account/UserSettings'

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
      <Router forceRefresh>
        <Switch>
          <ProtectedRoute {...routerProps} exact path="/account/account-info" component={AccountInfo} />
          <ProtectedRoute {...routerProps} exact path="/account/profile-info" component={ProfileInfo} />
          <ProtectedRoute {...routerProps} exact path="/account/account-devices" component={AccountDevices} />
          <ProtectedRoute {...routerProps} exact path="/account/change-password" component={ChangePassword} />
          <ProtectedRoute {...routerProps} exact path="/account/settings" component={UserSettings} />
          <ProtectedRoute {...routerProps} exact path="/user/:username" component={UserProfile} />
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
