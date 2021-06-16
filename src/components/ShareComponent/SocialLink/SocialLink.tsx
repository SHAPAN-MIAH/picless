import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import styles from './SocialLink.module.css'

interface SocialLinkProps {
  iconStyle: string
  icon: IconProp
}

const SocialLink: FunctionComponent<SocialLinkProps> = ({ iconStyle, icon }) => {
  return (
    <li className={`social-link ${styles[iconStyle]}`}>
      <FontAwesomeIcon icon={icon} color="white" />
    </li>
  )
}

export default SocialLink
