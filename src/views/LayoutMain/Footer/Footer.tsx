import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'

import styles from './Footer.module.css'

const Footer: FunctionComponent<{}> = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.innerFooter}>
          <div className={styles.logoContainer}>
            <div className="header-brand">
              <div className="logo">
                <svg className="icon-logo-vikinger small">
                  <use xlinkHref="#svg-logo-vikinger" style={{ fill: '#3e3f5' }} />
                </svg>
              </div>

              <h1 className="header-brand-text">{process.env.REACT_APP_WEBSITE_NAME}</h1>
            </div>
          </div>
          <div className={styles.footerThird}>
            <h5>More</h5>
            <Link to="/support">Zaraza</Link>
          </div>
          <div className={styles.footerThird}>
            <h5>Need help?</h5>
            <Link to="/support">Help / Support</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className={styles.footerThird}>
            <h5>Need help?</h5>
            <Link to="/support">Help / Support</Link>
            <Link to="/terms-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
