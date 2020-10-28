/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import Loader from 'react-loader-spinner'
// import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

import classNames from 'classnames'
import * as PostService from '../../../../services/PostService'

import FormRow from '../../../../components/Common/Form/FormRow'
import FormItem from '../../../../components/Common/Form/FormItem'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'

import styles from './UploadSourcePost.module.css'
import { ResourceType, SourceType } from '../../../../types/PostType.d'

type UploadSourcePostProp = {
  onClose: any
  onUploadedFile: (source: SourceType, type: ResourceType) => void
}

type fileUploadStatus = 'PENDING' | 'UPLOADING' | 'FINISHED' | 'ERROR'

interface FilePreviewType extends File {
  url?: string
  status?: fileUploadStatus
}

const qtyResources: number = parseInt(process.env.REACT_APP_QTY_RESOURCES_POST || '8', 10)

const UploadSourcePost: FunctionComponent<UploadSourcePostProp> = (props) => {
  const { t } = useTranslation()
  const { onClose, onUploadedFile } = props

  const [selectedFile, setSelectedFile] = useState<FilePreviewType[]>([])
  // const [selectedFilePreview, setSelectedFilePreview] = useState<filePreview[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    if (target.files && target.files.length <= qtyResources) {
      const files: FilePreviewType[] = selectedFile.concat([])
      let containsInvalidFormat = false

      for (let i = 0; i < target.files.length; i += 1) {
        const file: FilePreviewType = (target.files as FileList)[i]

        if (/^image/.test(file.type) || /^video/.test(file.type)) {
          file.url = URL.createObjectURL((target.files as FileList)[i])
          file.status = 'PENDING'

          console.log(file)

          files.push(file)
        } else {
          containsInvalidFormat = true
          break
        }
      }

      if (containsInvalidFormat) {
        alert('There are invalid format, please select images or videos')
      } else {
        setSelectedFile(files)
      }
    } else if (target.files && target.files.length > qtyResources) alert('Max 8 photos or videos')
    else {
      console.error('UNEXPECTED ERROR')
    }
  }

  const fileUploadHandler = () => {
    setIsLoading(true)

    const formDataList: FormData[] = []
    const largeFiles = selectedFile.length
    let previewList: FilePreviewType[] = selectedFile

    if (selectedFile) {
      selectedFile.forEach((file, index) => {
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

              if (largeFiles === index + 1) {
                setIsLoading(false)
              }

              onUploadedFile({ name: file.name, pathName: data.path }, fileType)
            })
            .catch((err) => {
              console.log(err)
              previewList = updateResourcePreviewStatus(previewList, file, 'ERROR')
              setSelectedFile(previewList)

              if (largeFiles === index + 1) {
                setIsLoading(false)
              }
            })
        } else {
          setIsLoading(false)
        }
      })

      setSelectedFile(previewList)
    }
  }

  const removeImage = (imageName: string) => {
    const selectedFilesTemp = selectedFile.filter((file) => file.name !== imageName)

    setSelectedFile(selectedFilesTemp)
  }

  const updateResourcePreviewStatus = (list: FilePreviewType[], file: FilePreviewType, status: fileUploadStatus) => {
    return list.map((item) => {
      if (item.name === file.name) {
        item.status = status
      }

      return item
    })
  }

  let fileInput: HTMLInputElement | null

  return (
    <>
      <FormRow className={classNames(styles.container)}>
        <FormItem>
          <div className={styles.subContainer} style={{ margin: '28px' }}>
            <div className={styles.header}>
              <h6>{t('home.createPost.uploadsources.title')}</h6>
              <a href="#/" style={{ color: '#adafca' }} onClick={() => onClose(false)}>
                <FontAwesomeIcon icon="times" />
              </a>
            </div>
            <div className={styles.previewContainer}>
              {/* SELECT FILES */}
              <div
                className={styles.addSource}
                onClick={() => {
                  if (fileInput) fileInput.click()
                }}
              >
                <FontAwesomeIcon icon="plus" />
              </div>

              {/* IMAGES SELECTED AND UPLOADED */}
              {selectedFile.map((item) => {
                // PREVIEW
                if (/^image/.test(item.type) || /^video/.test(item.type)) {
                  let imgUrl = item.url
                  if (/^video/.test(item.type)) {
                    imgUrl = `${process.env.PUBLIC_URL}/assets/img/defaults/video_preview.jpg`
                  }

                  return (
                    <div
                      title={item.name}
                      className={classNames(styles.previewSource, 'fixed-height')}
                      key={`${item.lastModified}${item.name}`}
                      style={{
                        background: `url(${imgUrl}) center center / cover no-repeat`,
                      }}
                    >
                      {item.status === 'PENDING' && (
                        <div
                          style={{
                            textAlign: 'right',
                            color: 'white',
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#23d2e2',
                          }}
                          onClick={() => {
                            removeImage(item.name)
                          }}
                        >
                          <FontAwesomeIcon icon="times" />
                        </div>
                      )}

                      {item.status === 'UPLOADING' && (
                        <div className={classNames(styles.previewStatusBase, styles.previewStatusUploading)}>
                          <div style={{ position: 'absolute' }}>
                            <Loader type="TailSpin" color="#615dfa" height={20} width={20} visible />
                          </div>
                        </div>
                      )}

                      {item.status === 'FINISHED' && (
                        <>
                          <div className={classNames(styles.previewStatusBase, styles.previewStatusSuccess)}>
                            <div style={{ textAlign: 'center', fontSize: '30px', paddingTop: '15px', color: 'white' }}>
                              <FontAwesomeIcon icon="check" />
                            </div>
                          </div>
                        </>
                      )}

                      {item.status === 'ERROR' && (
                        <div className={classNames(styles.previewStatusBase, styles.previewStatusError)} />
                      )}
                    </div>
                  )
                }

                return ''
              })}
            </div>
            <ButtonWithLoader
              type="button"
              className="button small primary"
              showLoader={isLoading}
              onClick={fileUploadHandler}
              disabled={selectedFile.length < 1}
            >
              {t('Upload')}
            </ButtonWithLoader>

            {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div style={{ marginLeft: '28px', marginBottom: '10px' }}>
                    <div
                      style={{
                        width: '23px',
                        height: '23px',
                      }}
                    >
                      <CircularProgressbar
                        value={percentage}
                        strokeWidth={50}
                        styles={buildStyles({
                          strokeLinecap: 'butt',
                          pathColor: '#615dfa',
                        })}
                      />
                    </div>
                  </div>
                </div> */}

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
        </FormItem>
      </FormRow>
    </>
  )
}

export default UploadSourcePost
