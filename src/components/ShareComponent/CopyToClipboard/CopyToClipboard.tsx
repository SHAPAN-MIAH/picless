import React, { FunctionComponent, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

interface UserProfileProps {
  userProfile: string
}

const CopyToClipboardComponent: FunctionComponent<UserProfileProps> = ({ userProfile }) => {
  const [isCopied, setIsCopied] = useState(false)
  const link = `michael.lup20.uk/u/${userProfile}`

  const copyToClipboard = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  return (
    <>
      <h4>Copty to ClipBoard</h4>
      <p>{link}</p>

      <div className="clipboard">
        <CopyToClipboard text={link} onCopy={copyToClipboard}>
          <a> {isCopied ? 'Copied!' : <FontAwesomeIcon icon={faClipboard} color="black" />}</a>
        </CopyToClipboard>
      </div>
    </>
  )
}

export default CopyToClipboardComponent
