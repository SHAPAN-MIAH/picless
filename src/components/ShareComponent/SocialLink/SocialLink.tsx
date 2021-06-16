import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import styles from './SocialLink.module.css'

interface SocialLinkProps {
  icon: string
  socialIcon: IconProp
}

const SocialLink: FunctionComponent<SocialLinkProps> = ({ icon, socialIcon }) => {
  return (
    <li className={`social-link ${styles[icon]}`}>
      <FontAwesomeIcon icon={socialIcon} color="white" />
    </li>
  )
}

export default SocialLink
