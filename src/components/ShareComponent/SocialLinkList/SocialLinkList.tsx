import React from 'react'
import { faFacebook, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk, faClipboard } from '@fortawesome/free-solid-svg-icons'

import SocialLink from '../SocialLink/SocialLink'

const socialMedia = [
  { name: 'facebook', icon: faFacebook },
  { name: 'twitter', icon: faTwitter },
  { name: 'whatsapp', icon: faWhatsapp },
  { name: 'mail', icon: faMailBulk },
]

const SocialLinkList = () => {
  return (
    <>
      <ul className="social-links">
        {socialMedia.map(({ name, icon }) => (
          <SocialLink key={name} name={name} icon={icon} url={'github.com'} text={'Hi my friend'} />
        ))}
      </ul>
    </>
  )
}

export default SocialLinkList
