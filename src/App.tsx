import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LayoutWithouAuth from './views/LandingWithoutAuth/LayoutWithouAuth'
import AccountInfo from './views/Account/AccountInfo'
import ProfileInfo from './views/Account/ProfileInfo'

import { store } from './redux/store'
import ChangePassword from './views/Account/ChangePassword'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router forceRefresh>
          <Switch>
            <Route path="/account-info">
              <AccountInfo />
            </Route>
            <Route path="/profile-info">
              <ProfileInfo />
            </Route>
            <Route path="/change-password">
              <ChangePassword />
            </Route>
            <Route exact path="/">
              <LayoutWithouAuth />
            </Route>
            <Route path="/">
              <h1>ERROR</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App
