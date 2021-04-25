/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { FunctionComponent, useState } from 'react'
import { UserType } from '../../../../types/UserType'
import FormItem from '../../../../components/Common/Form/FormItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import PostService from '../../../../services/PostService'
import { ResourceType, SourceType } from '../../../../types/PostType.d'
import * as Utils from '../../../../utils/Functions'
import PhotoPreview from './PhotoPreview/PhotoPreview'
import styles from './UploadSourcePost.module.css'

interface UploadSourcePostProp extends React.BaseHTMLAttributes<HTMLDivElement> {
  user: UserType
  onUploadedFile: (source: { images: SourceType[]; videos: SourceType[] }) => void
  onLoading: (status: boolean) => void
  onRemove: (name: string) => void
}

type fileUploadStatus = 'PENDING' | 'UPLOADING' | 'FINISHED' | 'ERROR'

interface FilePreviewType extends File {
  url?: string
  internalName?: string
  status?: fileUploadStatus
}

const qtyResources: number = parseInt(process.env.REACT_APP_QTY_RESOURCES_POST || '8', 10)

const UploadSourcePost: FunctionComponent<UploadSourcePostProp> = (props) => {
  const { user, onUploadedFile, onRemove, onLoading, className } = props

  const [selectedFile, setSelectedFile] = useState<FilePreviewType[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user.verifiedAccount) {
      alert('Need verify account')
    } else {
      const target = e.target as HTMLInputElement
      onLoading(true)
      if (target.files && target.files.length <= qtyResources) {
        const files: FilePreviewType[] = selectedFile.concat([])
        let containsInvalidFormat = false

        for (let i = 0; i < target.files.length; i += 1) {
          const file: FilePreviewType = (target.files as FileList)[i]

          if (/^image/.test(file.type) || /^video/.test(file.type)) {
            file.internalName = `${Utils.simpleKeyGenerator(5)}_${file.name}`
            file.url = URL.createObjectURL((target.files as FileList)[i])
            file.status = 'PENDING'

            files.push(file)
          } else {
            containsInvalidFormat = true
            break
          }
        }

        if (containsInvalidFormat) {
          alert('There are invalid format, please select images or videos')
          onLoading(false)
        } else {
          setSelectedFile(files)
          fileUploadHandler(files)
        }
      } else if (target.files && target.files.length > qtyResources) {
        onLoading(false)

        alert('Max 8 photos or videos')
      } else {
        console.error('UNEXPECTED ERROR')
        onLoading(false)
      }
    }
  }

  const fileUploadHandler = (files: FilePreviewType[]) => {
    const formDataList: FormData[] = []
    const imageList: SourceType[] = []
    const videoList: SourceType[] = []

    const largeFiles = files.length
    let previewList: FilePreviewType[] = files

    if (files) {
      files.forEach((file, index) => {
        if (file.status === 'PENDING') {
          let fileType: ResourceType
          const formData = new FormData()

          if (/^image/.test(file.type)) {
            formData.append('fileType', 'image')
            fileType = 'IMAGE'
          } else if (/^video/.test(file.type)) {
            formData.append('fileType', 'video')
            fileType = 'VIDEO'
          }

          formData.append('coverImage', file, file.name)
          formDataList.push(formData)

          previewList = updateResourcePreviewStatus(previewList, file, 'UPLOADING')

          PostService.uploadPostResource(formData)
            .then((data) => {
              previewList = updateResourcePreviewStatus(previewList, file, 'FINISHED')
              setSelectedFile(previewList)

              const sourceName = file.internalName || file.name
              const source = { name: sourceName, pathName: data.path }

              if (imageList && fileType === 'IMAGE') {
                imageList.push(source)
              } else if (videoList) {
                videoList.push(source)
              }

              if (largeFiles === index + 1) {
                onLoading(false)
                onUploadedFile({ images: imageList, videos: videoList })
              }
            })
            .catch((err) => {
              console.log(err)
              previewList = updateResourcePreviewStatus(previewList, file, 'ERROR')
              setSelectedFile(previewList)

              if (largeFiles === index + 1) {
                onLoading(false)
              }
            })
        } else {
          onLoading(false)
        }
      })

      setSelectedFile(previewList)
    }
  }

  const removeImage = (imageName: string) => {
    const selectedFilesTemp = selectedFile.filter((file) => file.internalName !== imageName)

    setSelectedFile(selectedFilesTemp)
    onRemove(imageName)
  }

  const updateResourcePreviewStatus = (list: FilePreviewType[], file: FilePreviewType, status: fileUploadStatus) => {
    return list.map((item) => {
      if (item.name === file.name && item.status !== 'FINISHED') {
        item.status = status
      }

      return item
    })
  }

  let fileInput: HTMLInputElement | null

  return (
    <>
      <FormRow className={classNames(className)}>
        <FormItem>
          <div className={styles.main}>
            <div className={styles.container}>
              <div
                className={classNames(styles.itemBase, styles.addSource)}
                onClick={() => {
                  if (fileInput) fileInput.click()
                }}
              >
                <div style={{ textAlign: 'center', color: 'white' }}>
                  <FontAwesomeIcon icon="plus" color="white" />
                </div>
              </div>

              {/* IMAGES SELECTED AND UPLOADED */}
              {selectedFile.map((item, index) => {
                // PREVIEW
                if (/^image/.test(item.type) || /^video/.test(item.type)) {
                  let imgSrc = item.url || ''
                  if (/^video/.test(item.type)) {
                    imgSrc = `${process.env.PUBLIC_URL}/assets/img/defaults/video_preview.jpg`
                  }

                  const key = `${item.lastModified}${item.name}${index}`

                  return <PhotoPreview key={key} item={item} imgSrc={imgSrc} onRemoveImage={removeImage} />
                }

                return ''
              })}

              <input
                style={{ display: 'none' }}
                type="file"
                multiple
                onChange={fileSelectedHandler}
                ref={(input) => {
                  fileInput = input
                }}
              />
            </div>
          </div>
        </FormItem>
      </FormRow>
    </>
  )
}

export default UploadSourcePost
