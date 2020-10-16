/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { uploadUserImages } from '../../redux/User/UserThunks'
import { ImageType, UploadImageType } from '../../types/UserType.d'

interface UploadBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  imageType: ImageType
  iconName: string
  uploadTitleName: string
  uploadText: string
}

const UploadBox = (props: UploadBoxProps) => {
  const dispatch = useDispatch()
  const { id, iconName, className, uploadText, uploadTitleName, imageType } = props
  const fileField = React.useRef<HTMLInputElement>(null)

  // const [urlImage, setUrlImage] = useState(imageUrl)

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

    dispatch(uploadUserImages(imageData))
    // UserService.uploadUserImages(imageData)
    //   .then((user) => {
    //     if (imageType === 'COVER') {
    //       setUrlImage(user.coverPicture)
    //     } else if (imageType === 'PROFILE') {
    //       setUrlImage(user.profilePicture)
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //   })
  }

  return (
    <div className={classNames('upload-box', className)} onClick={openSelectionFile}>
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
