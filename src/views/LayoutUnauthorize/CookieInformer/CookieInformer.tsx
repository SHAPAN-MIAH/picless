import React, { FunctionComponent } from 'react'

import styles from './CookieInformer.module.css'

const CookieInformer: FunctionComponent<{}> = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.innerFooter}>
          <div className={styles.textContainer}>
            <p>We use cookies to improve your experience using this site. </p>
            <a href="" style={{ color: 'white' }}>
              &nbsp;More Information
            </a>
          </div>

          <a href="" className={styles.acceptButton}>
            Accept
          </a>
        </div>
      </div>
    </>
  )
}

export default CookieInformer
