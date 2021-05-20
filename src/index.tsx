import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from '@aws-amplify/auth'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/lib/integration/react'

// import { store, persistor } from './redux/store'
import awsconfig from './aws-exports'

import 'bootstrap/dist/css/bootstrap.min.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './i18n'

import App from './App'

Amplify.configure(awsconfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
