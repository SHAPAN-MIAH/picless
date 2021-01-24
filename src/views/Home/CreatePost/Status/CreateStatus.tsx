import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import PostService from '../../../../services/PostService'

import FormItem from '../../../../components/Common/Form/FormItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import InputTags from '../../../../components/InputTags/InputTags'
import ScheduleMessage from './ScheduleMessage/ScheduleMessage'

import { SourceType, CommonPostType, TagType } from '../../../../types/PostType.d'

import styles from './CreateStatus.module.css'
import UploadSourcePost from './UploadSourcePost/UploadSourcePost'

const CreateStatus: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const [showUploadPhotos, setShowUploadPhotos] = useState<boolean>(false)
  const [showTags, setShowTags] = useState<boolean>(false)
  const [showSchedule, setShowSchedule] = useState<boolean>(false)

  const [qtyCharactersPost, setQtyCharactersPost] = useState<number>(0)

  const [content, setContent] = useState<string>('')
  const [imageList, setImageList] = useState<SourceType[]>()
  const [videoList, setVideoList] = useState<SourceType[]>()

  const [tagsList, setTagsList] = useState<string[]>([])

  let scheduleStartDate: Date | null
  let scheduleEndDate: Date | null

  const onChangeCreatePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e

    setContent(target.value)
    setQtyCharactersPost(target.value.length)
  }

  const onUploadedFile = (source: { images: SourceType[]; videos: SourceType[] }) => {
    setImageList(source.images)
    setVideoList(source.videos)
  }

  const createPost = () => {
    const tags = convertToTagType()
    const post: CommonPostType = {
      content,
      featuredPost: false,
      tags,
      startDate: scheduleStartDate || '',
      endDate: scheduleEndDate || '',
      images: imageList,
      videos: videoList,
    }

    PostService.createPost(post).then(() => {
      cleanCreatePost()
    })
  }

  const convertToTagType = (): TagType[] => {
    const tags: TagType[] = []

    tagsList.forEach((tag) => {
      tags.push({ tagName: tag })
    })
    console.log(tags)
    return tags
  }

  const cleanCreatePost = () => {
    window.location.reload()
  }

  return (
    <>
      <div className="quick-post-body">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <FormRow className={classNames(!showUploadPhotos ? styles.show : styles.hide)}>
            <FormItem>
              <div className="form-textarea">
                <textarea
                  id="quick-post-text"
                  name="quick_post_text"
                  placeholder={t('home.createPost.placeholderPostText')}
                  value={content || ''}
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
              </div>
            </FormItem>
          </FormRow>

          {/* UPLOADPHOTO VIEW */}

          <UploadSourcePost
            className={classNames(showUploadPhotos ? styles.show : styles.hide)}
            onUploadedFile={onUploadedFile}
            onClose={() => {
              setShowUploadPhotos(false)
            }}
          />

          {/* TAGS VIEW */}
          <div className={classNames(showTags ? styles.show : styles.hide)}>
            <InputTags
              maxTags={5}
              onChange={(list: string[]) => {
                setTagsList(list)
              }}
            />
          </div>

          {/* SCHEDULE VIEW */}
          <div className={classNames(styles.scheduleContainer, showSchedule ? styles.show : styles.hide)}>
            <ScheduleMessage
              onApplySchedule={(start, end) => {
                scheduleStartDate = start
                scheduleEndDate = end
              }}
            />
          </div>
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

          <div
            className="quick-post-footer-action"
            onClick={() => {
              setShowTags(!showTags)
              setShowSchedule(false)
            }}
          >
            <svg className="quick-post-footer-action-icon icon-tags">
              <use xlinkHref="#svg-tags" />
            </svg>
          </div>

          <div
            className="quick-post-footer-action"
            onClick={() => {
              setShowSchedule(!showSchedule)
              setShowTags(false)
            }}
          >
            <svg className="menu-item-link-icon icon-events">
              <use xlinkHref="#svg-events" />
            </svg>
          </div>
        </div>

        <div className="quick-post-footer-actions">
          <button type="button" className="button small void">
            {t('home.createPost.discardButton')}
          </button>

          <button type="button" className="button small secondary" onClick={createPost}>
            {t('home.createPost.postButton')}
          </button>
        </div>
      </div>
    </>
  )
}

export default CreateStatus
