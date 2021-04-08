import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import LoginForm from './LoginForm'

import ForgotPassword from './ForgotPassword/ForgotPassword'
import Alert from '../../../../components/Common/Alerts/Alerts'

export type CurrentView = 'LOGIN' | 'FORGOT_PASSWORD_EMAIL' | 'FORGOT_PASSWORD_NEW_PASSWORD'

const Login: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const [currentView, setCurrentView] = useState<CurrentView>('LOGIN')
  const [messages, setMessages] = useState<string>('')

  const showLogin = currentView === 'LOGIN'

  const changeView = (view: CurrentView) => {
    setCurrentView(view)
  }

  const backToLogin = (message?: string) => {
    setCurrentView('LOGIN')
    if (message) setMessages(message)
  }

  return (
    <div className="form-box login-register-form-element" style={{ display: 'block' }}>
      <img
        className="form-box-decoration overflowing"
        src={`${process.env.PUBLIC_URL}/assets/img/landing/rocket.png`}
        alt="rocket"
      />

      {showLogin && <LoginForm changeView={changeView} />}
      {!showLogin && <ForgotPassword backToLogin={backToLogin} />}

      {messages && <Alert alertType="PRIMARY" message={t(messages)} style={{ width: '100%' }} />}
    </div>
  )
}

export default Login
