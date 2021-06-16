import React from 'react'
import { faFacebook, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk, faClipboard } from '@fortawesome/free-solid-svg-icons'

import SocialLink from '../SocialLink/SocialLink'

import './SocialLinkList.module.css'

const socialIcons = [
  { id: 1, icon: 'facebook', socialIcon: faFacebook },
  { id: 2, icon: 'twitter', socialIcon: faTwitter },
  { id: 3, icon: 'whatsapp', socialIcon: faWhatsapp },
  { id: 4, icon: 'mail', socialIcon: faMailBulk },
  { id: 5, icon: 'clipboard', socialIcon: faClipboard },
]

const SocialLinkList = () => {
  return (
    <ul className="social-links">
      {socialIcons.map((social) => {
        console.log(social)
        return <SocialLink key={social.id} icon={social.icon} socialIcon={social.socialIcon} color={social.icon} />
      })}
    </ul>
  )
}

export default SocialLinkList
