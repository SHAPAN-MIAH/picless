import React, { FunctionComponent, useCallback, useState } from 'react'

import RegisterForm from './RegisterForm'
import ConfirmEmail from './ConfirmEmail'

export type RegisterViewType = 'REGISTER' | 'CONFIRM_EMAIL'

const Register: FunctionComponent<{}> = () => {
  const [currentView, setCurrentView] = useState<RegisterViewType>('REGISTER')
  const [email, setEmail] = useState<string>('')

  const changeView = useCallback((view: RegisterViewType) => {
    setCurrentView(view)
  }, [])

  return (
    <div className="form-box login-register-form-element" style={{ display: 'block' }}>
      <img className="form-box-decoration" src={`${process.env.PUBLIC_URL}/assets/img/landing/rocket.png`} alt="rocket" />

      {currentView === 'REGISTER' && <RegisterForm changeView={changeView} setEmail={setEmail} />}
      {currentView === 'CONFIRM_EMAIL' && <ConfirmEmail email={email} />}
    </div>
  )
}

export default Register
