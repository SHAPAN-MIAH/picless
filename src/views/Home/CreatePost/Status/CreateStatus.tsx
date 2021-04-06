import classNames from 'classnames'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import FormItem from '../../../../components/Common/Form/FormItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import useUser from '../../../../hooks/useUser'
import PostService from '../../../../services/PostService'
import { CommonPostType, SourceType } from '../../../../types/PostType.d'
import styles from './CreateStatus.module.css'
import UploadSourcePost from './UploadSourcePost/UploadSourcePost'

const FormTextAreaDiv = styled.div`
  margin-right: 0px;
`

const CreateStatus: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { user } = useUser()

  const [showUploadPhotos, setShowUploadPhotos] = useState<boolean>(false)
  // const [showTags, setShowTags] = useState<boolean>(false)
  // const [showSchedule, setShowSchedule] = useState<boolean>(false)

  const [qtyCharactersPost, setQtyCharactersPost] = useState<number>(0)

  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [imageList, setImageList] = useState<SourceType[]>()
  const [videoList, setVideoList] = useState<SourceType[]>()

  // const [tagsList, setTagsList] = useState<string[]>([])

  let scheduleStartDate: Date | null
  let scheduleEndDate: Date | null

  const onChangeCreatePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e

    setContent(target.value)
    setQtyCharactersPost(target.value.length)
  }

  const onUploadedFile = (source: { images: SourceType[]; videos: SourceType[] }) => {
    if (user.verifiedAccount) {
      const imgs = imageList?.concat(source.images) || source.images
      const vids = videoList?.concat(source.videos) || source.videos

      setImageList(imgs)
      setVideoList(vids)
    } else {
      alert('Need verify account')
    }
  }

  const createPost = () => {
    setLoading(true)
    //    const tags = convertToTagType()
    if (!user.verifiedAccount) {
      alert('Need verify account')

      setLoading(false)
    } else {
      const post: Partial<CommonPostType> = {
        content,
        featuredPost: false,
        tags: [],
        startDate: scheduleStartDate || '',
        endDate: scheduleEndDate || '',
        images: imageList,
        videos: videoList,
      }

      PostService.createPost(post).then(() => {
        setLoading(false)

        cleanCreatePost()
      })
    }
  }

  // const convertToTagType = (): TagType[] => {
  //   const tags: TagType[] = []

  //   tagsList.forEach((tag) => {
  //     tags.push({ tagName: tag })
  //   })
  //   return tags
  // }

  const cleanCreatePost = () => {
    window.location.reload()
  }

  const onLoading = (status: boolean) => {
    console.log(status)
    setLoading(status)
  }

  const onRemoveImage = (name: string) => {
    const updatedImgList = imageList?.filter((image) => image.name !== name)
    const updatedVidList = videoList?.filter((video) => video.name !== name)

    setImageList(updatedImgList)
    setVideoList(updatedVidList)
  }

  return (
    <>
      <div className="quick-post-body">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          {/* UPLOADPHOTO VIEW */}
          <UploadSourcePost
            className={classNames(styles.uploadPhotosContainer, showUploadPhotos ? styles.active : '')}
            user={user}
            onUploadedFile={onUploadedFile}
            onLoading={onLoading}
            onRemove={onRemoveImage}
          />

          <FormRow>
            <FormItem>
              <FormTextAreaDiv className="form-textarea">
                <textarea
                  id="quick-post-text"
                  name="quick_post_text"
                  placeholder={t('home.createPost.placeholderPostText', { fullName: user.userName })}
                  value={content || ''}
                  className={styles.quickPostText}
                  onChange={onChangeCreatePost}
                  minLength={0}
                  maxLength={1000}
                />{' '}
                <p className="form-textarea-limit-text">
                  {qtyCharactersPost >= 1000 && (
                    <span style={{ color: 'red' }}>{`(${t('home.createPost.error.limitCharacters')})  `}</span>
                  )}
                  {`${qtyCharactersPost}/1000`}
                </p>
              </FormTextAreaDiv>
            </FormItem>
          </FormRow>

          {/* TAGS VIEW */}
          {/* <div className={classNames(showTags ? styles.show : styles.hide)}>
            <InputTags
              maxTags={5}
              onChange={(list: string[]) => {
                setTagsList(list)
              }}
            />
          </div> */}

          {/* SCHEDULE VIEW */}
          {/* <div className={classNames(styles.scheduleContainer, showSchedule ? styles.show : styles.hide)}>
            <ScheduleMessage
              onApplySchedule={(start, end) => {
                scheduleStartDate = start
                scheduleEndDate = end
              }}
            />
          </div> */}
        </form>
      </div>

      <div className="quick-post-footer">
        <div className="quick-post-footer-actions">
          <div
            className="quick-post-footer-action"
            onClick={() => {
              setShowUploadPhotos(!showUploadPhotos)
            }}
          >
            <svg className="quick-post-footer-action-icon icon-camera">
              <use xlinkHref="#svg-camera" />
            </svg>
          </div>

          {/* <div
            className="quick-post-footer-action"
            onClick={() => {
              setShowTags(!showTags)
              setShowSchedule(false)
            }}
          >
            <svg className="quick-post-footer-action-icon icon-tags">
              <use xlinkHref="#svg-tags" />
            </svg>
          </div> */}

          {/* <div
            className="quick-post-footer-action"
            onClick={() => {
              setShowSchedule(!showSchedule)
              setShowTags(false)
            }}
          >
            <svg className="menu-item-link-icon icon-events">
              <use xlinkHref="#svg-events" />
            </svg>
          </div> */}
        </div>

        <div className="quick-post-footer-actions">
          <button type="button" className="button small void">
            {t('home.createPost.discardButton')}
          </button>

          <ButtonWithLoader type="button" className="button small secondary" onClick={createPost} showLoader={loading}>
            {t('home.createPost.postButton')}
          </ButtonWithLoader>
        </div>
      </div>
    </>
  )
}

export default CreateStatus
