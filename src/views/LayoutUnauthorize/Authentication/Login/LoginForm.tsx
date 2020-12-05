import React, { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
// import i18n from 'i18next'

import { errorSelector, messageSelector, getAction } from '../../../../redux/Auth/AuthSelectors'
import { login, showForgotPasswordEmail } from '../../../../redux/Auth/AuthThunks'

import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import FormRow from '../../../../components/Common/Form/FormRow'

import TextInput from '../../../../components/Common/TextInput'

import Alert from '../../../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'

const LoginForm = () => {
  const { t } = useTranslation()

  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const currentAction = useSelector(getAction)
  const dispatch = useDispatch()

  // const [userName, setUserName] = useState('')
  // const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('marcelo@lup20.uk')
  const [password, setPassword] = useState('Nokia2000')

  const [rememberMe, setRememberMe] = useState(false)
  // const [language, setLanguage] = useState('en')

  // const changeLanguage = () => {
  //   let currentLanguage = language

  //   if (language === 'en') {
  //     currentLanguage = 'es'
  //   } else {
  //     currentLanguage = 'en'
  //   }
  //   setLanguage(currentLanguage)

  //   i18n.changeLanguage(currentLanguage)
  // }

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(login(userName, password, rememberMe))
  }

  const showLoader = currentAction.action === 'LOGIN' && currentAction.status === 'WAITING'

  return (
    <>
      <h2 className="form-box-title">{t('authentication.accountLogin')}</h2>

      <form className="form" onSubmit={signIn}>
        <FormRowItem>
          <TextInput
            type="text"
            id="login-username"
            name="login_username"
            placeholder={t('authentication.usernameOrEmail')}
            value={userName}
            onChange={(e) => setUserName(e.target.value.toLowerCase())}
          />
        </FormRowItem>

        <FormRowItem>
          <TextInput
            type="password"
            id="login-password"
            name="login_password"
            placeholder={t('authentication.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowItem>

        <FormRow classNameRow="space-between">
          <div className="form-item">
            <div className="checkbox-wrap">
              <input
                type="checkbox"
                id="login-remember"
                name="login_remember"
                defaultChecked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked)
                }}
              />

              <div className="checkbox-box">
                <svg className="icon-cross">
                  <use xlinkHref="#svg-cross" />
                </svg>
              </div>

              <label htmlFor="login-remember">{t('authentication.rememberMe')}</label>
            </div>
          </div>

          <div className="form-item">
            <a
              className="form-link"
              href="#/"
              onClick={() => {
                dispatch(showForgotPasswordEmail(userName))
              }}
            >
              {t('authentication.forgotPassword')}
            </a>
          </div>
        </FormRow>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium secondary" showLoader={showLoader}>
            {t('authentication.loginToYourAccount')}
          </ButtonWithLoader>
        </FormRow>

        <FormRow>
          {error && <Alert alertType="DANGER" message={t(error)} style={{ width: '100%' }} />}
          {message && <Alert alertType="PRIMARY" message={t(message)} style={{ width: '100%' }} />}
        </FormRow>
      </form>
    </>
  )
}

export default LoginForm
