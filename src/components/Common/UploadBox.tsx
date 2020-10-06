/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames'
import React from 'react'
import UserService from '../../services/UserService'
import { ImageType, UploadImageType } from '../../types/UserType'

interface UploadBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  imageType: ImageType
  iconName: string
  uploadTitleName: string
  uploadText: string,
  imageUrl: string
}

const UploadBox = (props: UploadBoxProps) => {
  const { id, iconName, className, uploadText, uploadTitleName, imageType, imageUrl } = props
  const fileField = React.useRef<HTMLInputElement>(null)

  const openSelectionFile = () => {
    const { current } = fileField
    if (current) current.click()
  }

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const image: File = (target.files as FileList)[0]

    console.log(image)
    const imageData: UploadImageType = {
      imageType,
      coverImage: image,
    }

    UserService.uploadUserImages(imageData)
      .then((a) => {
        console.log(a)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className={classNames('upload-box', className)} onClick={openSelectionFile} data-src={imageUrl} >
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
