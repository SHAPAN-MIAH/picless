import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'
// import i18n from 'i18next'

import { getAction } from '../../../../redux/slices/AuthView'
import LoginForm from './LoginForm'
import ForgotPasswordEmail from './ForgotPassword/ForgotPasswordEmail'
import ForgotPasswordNewPassword from './ForgotPassword/ForgotPasswordNewPassword'

const Login = () => {
  const history = useHistory()

  useEffect(() => {
    if (currentAction.action === 'LOGIN' && currentAction.status === 'FINISHED') {
      history.push('/account-info')
    }
  })

  const currentAction = useSelector(getAction)

  const showForgotPasswordEmail = currentAction.action === 'FORGOT_PASSWORD_EMAIL'
  const showForgotPasswordNewPassword = currentAction.action === 'FORGOT_PASSWORD_NEW_PASSWORD'

  // const redirectToHome = currentAction.action === 'LOGIN' && currentAction.status === 'FINISHED'

  return (
    <div className="form-box login-register-form-element" style={{ display: 'block' }}>
      {/* {redirectToHome && <Redirect push to="/account-info" />} */}

      <img
        className="form-box-decoration overflowing"
        src={`${process.env.PUBLIC_URL}/assets/img/landing/rocket.png`}
        alt="rocket"
      />

      {!showForgotPasswordEmail && !showForgotPasswordNewPassword && <LoginForm />}
      {showForgotPasswordEmail && <ForgotPasswordEmail />}
      {showForgotPasswordNewPassword && <ForgotPasswordNewPassword />}
    </div>
  )
}

export default Login
