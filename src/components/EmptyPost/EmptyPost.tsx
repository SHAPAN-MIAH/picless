import React, { FunctionComponent } from 'react'
import styles from './EmptyPost.module.css'

type EmptyPostProps = {
  message: string
  footer: string
}

const EmptyPost: FunctionComponent<EmptyPostProps> = (props) => {
  const { message, footer } = props
  return (
    <>
      <div>
        <div className={styles.container}>
          <p className={styles.messageText}>{message}</p>
        </div>
        <div className={styles.containerFooter}>
          <div className={styles.messageFooter}> {footer} </div>
        </div>
      </div>
    </>
  )
}

export default EmptyPost
