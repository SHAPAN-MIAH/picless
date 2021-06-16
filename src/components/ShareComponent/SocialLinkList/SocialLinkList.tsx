import React from 'react'
import { faFacebook, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk, faClipboard } from '@fortawesome/free-solid-svg-icons'

import SocialLink from '../SocialLink/SocialLink'

import './SocialLinkList.module.css'

const socialIcons = [
  { icon: 'facebook', socialIcon: faFacebook },
  { icon: 'twitter', socialIcon: faTwitter },
  { icon: 'whatsapp', socialIcon: faWhatsapp },
  { icon: 'mail', socialIcon: faMailBulk },
  { icon: 'clipboard', socialIcon: faClipboard },
]

const SocialLinkList = () => {
  return (
    <ul className="social-links">
      {socialIcons.map(({ icon, socialIcon }) => (
        <SocialLink key={icon} icon={icon} socialIcon={socialIcon} />
      ))}
    </ul>
  )
}

export default SocialLinkList
