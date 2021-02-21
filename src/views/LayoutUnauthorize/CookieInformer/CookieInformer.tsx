import React, { FunctionComponent } from 'react'

import styles from './CookieInformer.module.css'

const CookieInformer: FunctionComponent<{}> = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.innerFooter}>
          <div className={styles.textContainer}>
            <p>
              We use cookies to give you the best experience. If you agree to our use of cookies, please continue to use our
              site. Click here for our cookie policy. Our Privacy Policy has been updated, if you agree to our policy, please
              continue to our site.
            </p>
          </div>

          <a href="" className={styles.closeAcceptButton}>
            &times;
          </a>
        </div>
      </div>
    </>
  )
}

export default CookieInformer
