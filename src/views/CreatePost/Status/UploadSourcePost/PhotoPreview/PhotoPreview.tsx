import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'react-loader-spinner'

import styles from '../UploadSourcePost.module.css'
import LiquidImage from 'components/Common/LiquidImage'

type PhotoPreviewProps = {
  item: any
  imgSrc: string
  imgReference: React.RefObject<HTMLImageElement>
  onRemoveImage: (itemName: string) => void
}

const PhotoPreview: FunctionComponent<PhotoPreviewProps> = (props) => {
  const { item, imgSrc, imgReference, onRemoveImage } = props

  return (
    <>
      <LiquidImage
        imgReference={imgReference}
        className={classNames(styles.itemBase, 'fixed-height')}
        src={imgSrc}
        title={item.name}
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
      </LiquidImage>
    </>
  )
}

export default PhotoPreview
