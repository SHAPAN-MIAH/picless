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
import { url } from 'inspector'

type UploadSourcePostPost = {
  show: boolean
  onClose: any
}

type fileUploadStatus = 'PENDING' | 'UPLOADING' | 'FINISHED' | 'ERROR'

type filePreview = {
  url: string
  status: fileUploadStatus
}

const UploadSourcePost: FunctionComponent<UploadSourcePostPost> = (props) => {
  const { t } = useTranslation()
  const { show, onClose } = props

  const [selectedFile, setSelectedFile] = useState<File[]>([])
  const [selectedFilePreview, setSelectedFilePreview] = useState<filePreview[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement

    if (target.files) {
      const files: File[] = selectedFile.concat([])
      const filesPreview: filePreview[] = selectedFilePreview.concat([])
      let containsInvalidFormat = false

      for (let i = 0; i < target.files.length; i += 1) {
        const file = (target.files as FileList)[i]

        if (/^image/.test(file.type) || /^video/.test(file.type)) {
          files.push(file)
          filesPreview.push({ url: URL.createObjectURL((target.files as FileList)[i]), status: 'PENDING' })
        } else {
          containsInvalidFormat = true
          break
        }
      }

      if (containsInvalidFormat) {
        alert('There are invalid format, please select images or videos')
      } else {
        setSelectedFile(files)
        setSelectedFilePreview(filesPreview)
      }
    }
  }

  const fileUploadHandler = () => {
    setIsLoading(true)

    const formDataList: FormData[] = []
    const largeFiles = selectedFilePreview.length
    let previewList: filePreview[] = selectedFilePreview

    if (selectedFile) {
      selectedFile.forEach((file, index) => {
        if (/^image/.test(file.type)) {
          const formData = new FormData()
          formData.append('imageType', 'cover')
          formData.append('coverImage', file, file.name)

          formDataList.push(formData)

          previewList = updateImagePreviewStatus(previewList, index, 'UPLOADING')

          PostService.uploadPostImage(formData)
            .then(() => {
              previewList = updateImagePreviewStatus(previewList, index, 'FINISHED')
              setSelectedFilePreview(previewList)

              if (largeFiles === index + 1) {
                setIsLoading(false)
              }
            })
            .catch((err) => {
              console.log(err)
              previewList = updateImagePreviewStatus(previewList, index, 'ERROR')
              setSelectedFilePreview(previewList)
              if (largeFiles === index + 1) {
                setIsLoading(false)
              }
            })
        } else if (/^video/.test(file.type)) {
          const formData = new FormData()
          formData.append('fileType', 'video')
          formData.append('coverImage', file, file.name)

          formDataList.push(formData)

          previewList = updateImagePreviewStatus(previewList, index, 'UPLOADING')

          PostService.uploadPostVideo(formData)
            .then(() => {
              previewList = updateImagePreviewStatus(previewList, index, 'FINISHED')
              setSelectedFilePreview(previewList)

              if (largeFiles === index + 1) {
                setIsLoading(false)
              }
            })
            .catch((err) => {
              console.log(err)
              previewList = updateImagePreviewStatus(previewList, index, 'ERROR')
              setSelectedFilePreview(previewList)

              if (largeFiles === index + 1) {
                setIsLoading(false)
              }
            })
        }
      })

      setSelectedFilePreview(previewList)
    }
  }

  const removeImage = (imageName: string, indexSource: number) => {
    const selectedFilesTemp = selectedFile.filter((file) => file.name !== imageName)

    const selectedFilesPreviewTemp = selectedFilePreview.filter((a, index) => index !== indexSource)

    setSelectedFile(selectedFilesTemp)
    setSelectedFilePreview(selectedFilesPreviewTemp)
  }

  const updateImagePreviewStatus = (list: filePreview[], fileIndex: number, status: fileUploadStatus) => {
    return list.map((item, index) => {
      if (fileIndex === index) {
        const obj = {
          ...item,
          status,
        }
        return obj
      }

      return item
    })
  }

  let fileInput: HTMLInputElement | null

  return (
    <>
      <FormRow className={classNames(styles.container, show ? styles.show : styles.hide)}>
        <FormItem>
          <div className={styles.subContainer} style={{ margin: '28px' }}>
            <div className={styles.header}>
              <h6>{t('createpost.uploadsources.title')}</h6>
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
              {selectedFile.map((item, index) => {
                const previewHandler = selectedFilePreview[index]

                // PREVIEW
                if (/^image/.test(item.type) || /^video/.test(item.type)) {
                  let imgUrl = previewHandler.url
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
                      {previewHandler.status === 'PENDING' && (
                        <div
                          style={{
                            textAlign: 'right',
                            color: 'white',
                            width: '20px',
                            height: '20px',
                            backgroundColor: '#23d2e2',
                          }}
                          onClick={() => {
                            removeImage(item.name, index)
                          }}
                        >
                          <FontAwesomeIcon icon="times" />
                        </div>
                      )}

                      {previewHandler.status === 'UPLOADING' && (
                        <div className={classNames(styles.previewStatusBase, styles.previewStatusUploading)}>
                          <div style={{ position: 'absolute' }}>
                            <Loader type="TailSpin" color="#615dfa" height={20} width={20} visible />
                          </div>
                        </div>
                      )}

                      {previewHandler.status === 'FINISHED' && (
                        <>
                          <div className={classNames(styles.previewStatusBase, styles.previewStatusSuccess)}>
                            <div style={{ textAlign: 'center', fontSize: '30px', paddingTop: '15px', color: 'white' }}>
                              <FontAwesomeIcon icon="check" />
                            </div>
                          </div>
                        </>
                      )}

                      {previewHandler.status === 'ERROR' && (
                        <div className={classNames(styles.previewStatusBase, styles.previewStatusError)} />
                      )}
                    </div>
                  )
                }
                return <>{alert('not supported')}</>
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
