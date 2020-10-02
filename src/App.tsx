import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LayoutWithouAuth from './views/LandingWithoutAuth/LayoutWithouAuth'
import AccountInfo from './views/Account/AccountInfo'

import { store } from './redux/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/home">
              <AccountInfo />
            </Route>
            <Route path="/">
              <LayoutWithouAuth />
            </Route>
            <Route path="/error">
              <h1>ERROR</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default App
