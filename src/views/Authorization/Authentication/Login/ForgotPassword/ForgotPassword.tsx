import React, { FunctionComponent, useState } from 'react'

import { CurrentView } from '../Login'
import ForgotPasswordEmail from './ForgotPasswordEmail'
import ForgotPasswordNewPassword from './ForgotPasswordNewPassword'
import FormRow from '../../../../../components/Common/Form/FormRow'

const ForgotPassword: FunctionComponent<{ backToLogin: () => void }> = (props) => {
  const { backToLogin } = props

  const [currentView, setCurrentView] = useState<string>('FORGOT_PASSWORD_EMAIL')
  const [username, setUserName] = useState<string>('')

  const changeView = (view: CurrentView) => {
    setCurrentView(view)
  }

  return (
    <>
      {currentView === 'FORGOT_PASSWORD_EMAIL' && <ForgotPasswordEmail changeView={changeView} setUserName={setUserName} />}
      {currentView === 'FORGOT_PASSWORD_NEW_PASSWORD' && (
        <ForgotPasswordNewPassword username={username} backToLogin={backToLogin} />
      )}

      <FormRow>
        <p
          className="form-link"
          onClick={() => {
            if (currentView === 'FORGOT_PASSWORD_EMAIL') {
              backToLogin()
            } else {
              setCurrentView('FORGOT_PASSWORD_EMAIL')
            }
          }}
        >
          {'< Back'}
        </p>
      </FormRow>
    </>
  )
}

export default ForgotPassword
