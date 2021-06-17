import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, EmailShareButton } from 'react-share'

import styles from './SocialLink.module.css'

interface SocialLinkProps {
  name: string
  url: string
  text: string
  icon: IconProp
}

const SocialLink: FunctionComponent<SocialLinkProps> = ({ name, url, text, icon }) => {
  if (name === 'facebook') {
    return (
      <li className={`social-link ${styles[name]}`}>
        <FacebookShareButton url={url} quote={text}>
          <a>
            <FontAwesomeIcon icon={icon} color="white" />{' '}
          </a>
        </FacebookShareButton>
      </li>
    )
  } else if (name === 'twitter') {
    return (
      <li className={`social-link ${styles[name]}`}>
        <TwitterShareButton url={url} title={text}>
          <a>
            <FontAwesomeIcon icon={icon} color="white" />{' '}
          </a>
        </TwitterShareButton>
      </li>
    )
  } else if (name === 'whatsapp') {
    return (
      <li className={`social-link ${styles[name]}`}>
        <WhatsappShareButton url={url} title={text}>
          <a>
            <FontAwesomeIcon icon={icon} color="white" />{' '}
          </a>
        </WhatsappShareButton>
      </li>
    )
  } else if (name === 'mail') {
    return (
      <li className={`social-link ${styles[name]}`}>
        <EmailShareButton url={url} subject={text}>
          <a>
            <FontAwesomeIcon icon={icon} color="white" />{' '}
          </a>
        </EmailShareButton>
      </li>
    )
  } else {
    return <></>
  }
}

export default SocialLink
