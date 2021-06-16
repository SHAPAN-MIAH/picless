import React from 'react'
import { faFacebook, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk, faClipboard } from '@fortawesome/free-solid-svg-icons'

import SocialLink from '../SocialLink/SocialLink'

import './SocialLinkList.module.css'

const socialMedia = [
  { name: 'facebook', icon: faFacebook },
  { name: 'twitter', icon: faTwitter },
  { name: 'whatsapp', icon: faWhatsapp },
  { name: 'mail', icon: faMailBulk },
  { name: 'clipboard', icon: faClipboard },
]

const SocialLinkList = () => {
  return (
    <ul className="social-links">
      {socialMedia.map(({ name, icon }) => (
        <SocialLink key={name} iconStyle={name} icon={icon} />
      ))}
    </ul>
  )
}

export default SocialLinkList
