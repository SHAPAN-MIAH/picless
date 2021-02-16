import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import styled from 'styled-components'

import styles from './Footer.module.css'

const FooterDiv = styled.div`
  display: flex;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(173, 175, 202, 0.8);
  color: white;
  text-align: center;

  justify-content: space-evenly;
  height: ${isMobile ? 170 : 70}px;
  margin-top: ${isMobile ? -170 : -70}px;
  padding-left: ${isMobile ? 10 : 110}px;
  padding-top: ${isMobile ? 20 : 20}px;
`

const Footer: FunctionComponent<{}> = () => {
  return (
    <>
      <FooterDiv className={styles.footerContainer}>
        <nav className={styles.footerMenuSocial}>
          <a href="/" aria-current="page" className={styles.footerMenuItem}>
            {`©${new Date().getFullYear()} ${process.env.REACT_APP_WEBSITE_NAME}`}
          </a>
          <span className={styles.footerDivider}> | </span>
          <a href="//instagram.com/enjoyR" target="_blank" rel="noopener noreferrer" className={styles.footerMenuItem}>
            Instagram
          </a>
          <span className={styles.footerDivider}> | </span>
          <a href="//twitter.com/enjoyR" target="_blank" rel="noopener noreferrer" className={styles.footerMenuItem}>
            Twitter
          </a>
        </nav>

        <nav className={styles.footerMenuSocial}>
          <a>Privacy</a>
        </nav>

        <nav className={styles.footerMenuSocial}>
          <a>terms and conditions</a>
        </nav>
      </FooterDiv>
    </>
  )
}

export default Footer
