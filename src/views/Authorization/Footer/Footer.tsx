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
              <h2 className="header-brand-text">{process.env.REACT_APP_WEBSITE_NAME}</h2>
            </div>
          </div>
          <div className={styles.footerThird}>
            <Link to="/support/privacy">Privacy Policy</Link>
          </div>
          <div className={styles.footerThird}>
            <Link to="/support/terms-conditions">Terms &amp; Conditions</Link>
          </div>
          <div className={styles.footerThird}>
            <Link to="/support">Help / Support</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
