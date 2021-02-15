import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Login from './Authentication/Login/Login'
import Register from './Authentication/Register/Register'
import NavLoginRegister from './NavLoginRegister/NavLoginRegister'
import useRouter from '../../hooks/useRouter'

const LayoutWithouAuth: React.FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const route = useRouter()

  useEffect(() => {
    if (window.tpl) {
      window.tpl.load()

      dispatchEvent(new Event('load'))
    }
  }, [])

  return (
    <div className="landing">
      <div className="landing-decoration" />

      <div className="landing-info">
        <div className="logo">
          <svg className="icon-logo-vikinger">
            <use xlinkHref="#svg-logo-vikinger" />
          </svg>
        </div>

        <h2 className="landing-info-pretitle">{t('authentication.welcome')}</h2>

        <h1 className="landing-info-title">{process.env.REACT_APP_WEBSITE_NAME}</h1>
        <p className="landing-info-text">{t('authentication.welcomeDescription')}</p>

        <NavLoginRegister />
      </div>

      <div className="landing-form">
        {/* {route.location.hash.includes('login') && <Login />}
        {route.location.hash.includes('register') && <Register />} */}
        <Login />
        <Register />
      </div>
    </div>
  )
}

export default LayoutWithouAuth
