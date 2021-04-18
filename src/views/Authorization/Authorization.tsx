import React, { useEffect } from 'react'
import CookieConsent from 'react-cookie-consent'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Login from './Authentication/Login/Login'
import Register from './Authentication/Register/Register'
import Footer from './Footer/Footer'
import NavLoginRegister from './NavLoginRegister/NavLoginRegister'

const LandingContainer = styled.div`
  height: 100%
  overflow: hidden;
`

const Authorization: React.FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  useEffect(() => {
    setTimeout(() => {
      window.tpl.load(['landing-tabs'])
    }, 500)
  }, [])

  return (
    <>
      <LandingContainer className="landing">
        <CookieConsent
          location="top"
          buttonText="Sure man!!"
          cookieName="picless_cookie_consent"
          style={{ backgroundColor: 'rgba(173, 175, 202, 0.8)' }}
          expires={150}
        >
          We use cookies to improve your experience using this site.
        </CookieConsent>

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
      </LandingContainer>
      <Footer />
    </>
  )
}

export default Authorization
