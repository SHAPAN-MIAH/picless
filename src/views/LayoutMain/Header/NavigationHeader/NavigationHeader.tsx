import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const NavigationHeader: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <nav className="navigation">
      <ul className="menu-main">
        <li className="menu-main-item">
          <Link className="menu-main-item-link" to="/user/home">
            {t('header.navigation.home')}
          </Link>
        </li>

        <li className="menu-main-item">
          <Link className="menu-main-item-link" to="/user/messages">
            {t('header.navigation.messages')}
          </Link>
        </li>

        {/* <li className="menu-main-item">
          <a className="menu-main-item-link" href="#/">
            Faqs
          </a>
        </li>

        <li className="menu-main-item">
          <p className="menu-main-item-link">
            <svg className="icon-dots">
              <use xlinkHref="#svg-dots" />
            </svg>
          </p>

          <ul className="menu-main">
            <li className="menu-main-item">
              <a className="menu-main-item-link" href="#/">
                About Us
              </a>
            </li>

            <li className="menu-main-item">
              <a className="menu-main-item-link" href="#/">
                Our Blog
              </a>
            </li>

            <li className="menu-main-item">
              <a className="menu-main-item-link" href="#/">
                Contact Us
              </a>
            </li>

            <li className="menu-main-item">
              <a className="menu-main-item-link" href="#/">
                Privacy Policy
              </a>
            </li>
          </ul>
        </li> */}
      </ul>
    </nav>
  )
}

export default NavigationHeader
