import React from 'react'
import classNames from 'classnames'
import { isMobile } from 'react-device-detect'

import { ImageType, UploadImageType } from '../../types/UserType'
import useUser from '../../hooks/useUser'

interface UploadBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  imageType: ImageType
  iconName: string
  uploadTitleName: string
  uploadText: string
}

const UploadBox = (props: UploadBoxProps) => {
  const { id, iconName, className, uploadText, uploadTitleName, imageType } = props
  const fileField = React.useRef<HTMLInputElement>(null)
  const { uploadImage } = useUser()

  const openSelectionFile = () => {
    const { current } = fileField
    if (current) current.click()
  }

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const image: File = (target.files as FileList)[0]

    const imageData: UploadImageType = {
      imageType,
      coverImage: image,
    }

    uploadImage(imageData)
  }

  const styleMobile: React.CSSProperties = {}

  if (!isMobile) {
    styleMobile.flex = 1
  }

  return (
    <div className={classNames('upload-box', className)} style={styleMobile} onClick={openSelectionFile}>
      {/* <figure>
        <img src={urlImage} alt={imageType} />
      </figure> */}

      <svg className={classNames('upload-box-icon', `icon-${iconName}`)}>
        <use xlinkHref={`#svg-${iconName}`} />
      </svg>

      <p className="upload-box-title">{uploadTitleName}</p>

      <p className="upload-box-text">{uploadText}</p>

      <input id={id} onChange={handleFileSelected} ref={fileField} type="file" style={{ display: 'none' }} />
    </div>
  )
}

export default UploadBox
