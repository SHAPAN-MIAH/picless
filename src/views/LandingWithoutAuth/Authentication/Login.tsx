import React, { FormEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'react-router-dom'
// import i18n from 'i18next'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'

import { login, errors, messages, getAction } from '../../../redux/slices/Auth'

import { TextInput } from '../../../components/Common/TextInput'

import Alert from '../../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

const Login = () => {
  const { t } = useTranslation()

  const error: string = useSelector(errors)
  const message: string = useSelector(messages)
  const dispatch = useDispatch()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

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

  const currentAction = useSelector(getAction)

  const showLoader = currentAction.action === 'LOGIN' && currentAction.status === 'WAITING'

  const redirectToHome = currentAction.action === 'LOGIN' && currentAction.status === 'FINISHED'

  return (
    <div className="form-box login-register-form-element" style={{ display: 'block' }}>
      {redirectToHome && <Redirect to="/home" />}

      <img
        className="form-box-decoration overflowing"
        src={`${process.env.PUBLIC_URL}/assets/img/landing/rocket.png`}
        alt="rocket"
      />

      <h2 className="form-box-title">{t('authentication.accountLogin')}</h2>

      <form className="form" onSubmit={signIn}>
        <FormItem>
          <TextInput
            type="text"
            id="login-username"
            name="login_username"
            placeholder={t('authentication.usernameOrEmail')}
            defaultValue={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormItem>

        <FormItem>
          <TextInput
            type="password"
            id="login-password"
            name="login_password"
            placeholder={t('authentication.password')}
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormItem>

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
            <a className="form-link" href="#/">
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
    </div>
  )
}

export default Login
