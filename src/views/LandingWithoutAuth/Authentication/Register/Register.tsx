import React from 'react'
import { useSelector } from 'react-redux'

import { getAction } from '../../../../redux/slices/AuthView'

import RegisterForm from './RegisterForm'
import ConfirmEmail from './ConfirmEmail'

const Register = () => {
  const currentAction = useSelector(getAction)

  const showConfirmEmail = currentAction.action === 'CONFIRM_EMAIL'

  return (
    <div className="form-box login-register-form-element" style={{ display: 'block' }}>
      <img className="form-box-decoration" src={`${process.env.PUBLIC_URL}/assets/img/landing/rocket.png`} alt="rocket" />

      {!showConfirmEmail && <RegisterForm />}
      {showConfirmEmail && <ConfirmEmail />}
    </div>
  )
}

export default Register
