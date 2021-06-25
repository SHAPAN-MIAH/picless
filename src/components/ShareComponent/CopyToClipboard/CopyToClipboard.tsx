import React, { FunctionComponent, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

import useRouter from './../../../hooks/commons/useRouter'

import styles from './CopyToClipboard.module.css'

interface UserProfileProps {
  userProfile: string
}

const CopyToClipboardComponent: FunctionComponent<UserProfileProps> = ({ userProfile }) => {
  const [isCopied, setIsCopied] = useState(false)

  const mainUrl = window.location.origin
  const url = `${mainUrl}/${userProfile}`

  console.log('useRouter Hook', url)

  const copyToClipboard = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <>
      <h4 className={`user-status-title ${styles.socialLinkTitle}`}>Copty to ClipBoard</h4>
      <div className={styles.copyContainer}>
        <h6 className={styles.copyLink}>{url}</h6>
        <a className={styles.clipboard}>
          <CopyToClipboard text={url} onCopy={copyToClipboard}>
            <h6> {isCopied ? 'Copied' : <FontAwesomeIcon icon={faClipboard} color="#91E8F0" />}</h6>
          </CopyToClipboard>
        </a>
      </div>
    </>
  )
}

export default CopyToClipboardComponent
