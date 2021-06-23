import React, { FunctionComponent } from 'react'
import { faFacebook, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

import SocialLink from '../SocialLink/SocialLink'

import styles from './SocialLinkList.module.css'
const socialMedia = [
  { name: 'facebook', icon: faFacebook },
  { name: 'twitter', icon: faTwitter },
  { name: 'whatsapp', icon: faWhatsapp },
  { name: 'mail', icon: faMailBulk },
]

interface SocialLinkListProps {
  userProfile: string
}

const SocialLinkList: FunctionComponent<SocialLinkListProps> = ({ userProfile }) => {
  return (
    <>
      <ul className={`social-links ${styles.socialLinkList}`}>
        {socialMedia.map(({ name, icon }) => (
          <SocialLink
            key={name}
            name={name}
            icon={icon}
            url={`michael.lup20.uk/u/${userProfile}`}
            text={'Hi my friend, You want to Join US!'}
          />
        ))}
      </ul>
    </>
  )
}

export default SocialLinkList
