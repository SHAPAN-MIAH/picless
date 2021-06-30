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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { result } from 'lodash'
import { isDesktop } from 'react-device-detect'

import './UploadSourcePost.css'
import logo from  '../../../../Picless.png'
import { url } from 'inspector'

interface UploadSourcePostProp extends React.BaseHTMLAttributes<HTMLDivElement> {
  user: UserType
  onUploadedFile: (source: { images: SourceType[]; videos: SourceType[] }) => void
  onLoading: (status: boolean) => void
  onRemove: (name: string) => void
  fileInput: HTMLImageElement | any
  onReorder: ([]) => void
}

type fileUploadStatus = 'PENDING' | 'UPLOADING' | 'FINISHED' | 'ERROR'

interface FilePreviewType extends File {
  url?: string
  internalName?: string
  status?: fileUploadStatus
  reference?: React.RefObject<HTMLImageElement | HTMLVideoElement>
}

const qtyResources: number = parseInt(process.env.REACT_APP_QTY_RESOURCES_POST || '8', 10)

const UploadSourcePost: FunctionComponent<UploadSourcePostProp> = (props) => {
  const { user, onUploadedFile, onRemove, onLoading, className, fileInput, onReorder } = props

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
            file.reference = React.createRef()

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

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    onReorder(result)
    return result;
  };
  

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

          // Upload Image after selected
          PostService.uploadPostResource(formData)
            .then((data) => {
              previewList = updateResourcePreviewStatus(previewList, file, 'FINISHED')
              setSelectedFile(previewList)

              const sourceName = file.internalName || file.name
              const source: SourceType = { name: sourceName, pathName: data.path }

              if (imageList && fileType === 'IMAGE') {
                source.index = index
                source.width = file.reference?.current?.width
                source.height = file.reference?.current?.height

                imageList.push(source)
              } else if (videoList) {
                source.index = index
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

  const getListStyle = (isDraggingOver: boolean) => {
    return ({
      display: 'flex',
      overflow: 'auto',
    })
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any, index: number, imgSrc: string) => {
    const draggableArea = document.getElementById('draggableArea');
    
    if (isDragging) {
      draggableArea?.classList.add('dragging')
    }
    else {
      draggableArea?.classList.remove('dragging');
    }
    const basics = {
      ...draggableStyle,
      border: isDragging  && '3px solid #6610f2',
      borderRadius: '0.9em',
      width: '80px',
      height:'80px',
    }
    if (!isDesktop ) {
      return basics;
    }
    return {
      ...basics,
      visibility: isDragging ? 'hidden' : 'visible',
    }
  };

  const dragg = (result: any) =>  {
    const { source, destination } = result;
    if(
      !destination || 
      (source.index === destination.index && source.droppableId === destination.droppableId)
    ) {
      return;
    }
    setSelectedFile(prevItems => reorder(prevItems, source.index, destination.index)) 
  }


  return ( 
    <DragDropContext onDragEnd={(result: any) => dragg(result)}>
    <Droppable droppableId='uploadId' direction="horizontal">
     {(droppableProvided, snapshot) => 
     <div 
      {...droppableProvided.droppableProps} 
      ref={droppableProvided.innerRef} 
      style={getListStyle(snapshot.isDraggingOver)}
      id='draggableArea'>
      <FormRow className={classNames(className)} style={{width: '100%'}}>
        <FormItem>
          <div className={styles.main}>
            <div className={styles.container}>
              <div
                className={classNames(styles.itemBase, styles.addSource)}
                onClick={() => {
                  if (fileInput.current) fileInput.current.click()
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

                      return (
                        <Draggable 
                            key={key}
                            draggableId={key}
                            index={index}
                            >
                            {(draggableProvider, snapshot) =>
                              <div 
                                {...draggableProvider.dragHandleProps}
                                ref={draggableProvider.innerRef}
                                {...draggableProvider.draggableProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  draggableProvider.draggableProps.style,
                                  index,
                                  imgSrc
                                )}> 
                                <PhotoPreview
                                  imgReference={item.reference as React.RefObject<HTMLImageElement>}
                                  key={key}
                                  item={item}
                                  imgSrc={imgSrc}
                                  onRemoveImage={removeImage}
                                />
                              </div>}
                          </Draggable>
                      )
                    }

                    return ''
                  })}

              <input
                style={{ display: 'none' }}
                type="file"
                multiple
                onChange={fileSelectedHandler}
                ref={fileInput}
              />
            </div>
          </div>
        </FormItem>
      </FormRow>
      {droppableProvided.placeholder}
      </div>}
      </Droppable>
    </DragDropContext>
  )
}

export default UploadSourcePost
