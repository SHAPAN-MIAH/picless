import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import './SocialLink.module.css'
import styles from './SocialLinkList.module.css'

interface SocialLinkProps {
  icon: string
  color: string
  socialIcon: IconProp
}

const SocialLink: FunctionComponent<SocialLinkProps> = ({ icon, color, socialIcon }) => {
  return (
    <li className={`social-link ${icon} ${color}`}>
      <FontAwesomeIcon icon={socialIcon} />
    </li>
  )
}

export default SocialLink
