import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loader-spinner'

import styles from '../UploadSourcePost.module.css'

type PhotoPreviewProps = {
  item: any
  imgSrc: string
  onRemoveImage: (itemName: string) => void
}

const PhotoPreview: FunctionComponent<PhotoPreviewProps> = (props) => {
  const { item, imgSrc, onRemoveImage } = props

  return (
    <>
      <div
        className={classNames(styles.itemBase, 'fixed-height')}
        title={item.name}
        style={{
          background: `url(${imgSrc}) center center / cover no-repeat`,
        }}
      >
        {/* PENDING */}
        {item.status === 'PENDING' && (
          <div className={classNames(styles.previewStatusBase, styles.previewStatusPending)}> </div>
        )}

        {/* UPLOADING */}
        {item.status === 'UPLOADING' && (
          <div className={classNames(styles.previewStatusBase, styles.previewStatusUploading)}>
            <Loader type="TailSpin" color="#615dfa" height={20} width={20} visible />
          </div>
        )}

        {/* FINISHED */}
        {item.status === 'FINISHED' && (
          <>
            <div className={classNames(styles.previewStatusBase, styles.previewStatusSuccess)}>
              <div
                className={styles.removeImage}
                onClick={() => {
                  onRemoveImage(item.internalName)
                }}
              >
                <FontAwesomeIcon icon="times" color="white" size="1x" />
              </div>
              <FontAwesomeIcon icon="check" />
            </div>
          </>
        )}

        {/* ERROR */}
        {item.status === 'ERROR' && <div className={classNames(styles.previewStatusBase, styles.previewStatusError)} />}
      </div>
    </>
  )
}

export default PhotoPreview
