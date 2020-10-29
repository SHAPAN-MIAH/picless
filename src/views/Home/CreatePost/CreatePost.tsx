/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

// import 'react-circular-progressbar/dist/styles.css'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import UploadSourcePost from './UploadSourcePost/UploadSourcePost'
import InputTags from '../../../components/InputTags/InputTags'
import ScheduleMessage from './ScheduleMessage/ScheduleMessage'

import { ResourceType, SourceType } from '../../../types/PostType.d'

import styles from './CreatePost.module.css'

const CreatePost: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const [showUploadPhotos, setShowUploadPhotos] = useState<boolean>(false)
  const [showTags, setShowTags] = useState<boolean>(false)
  const [showSchedule, setShowSchedule] = useState<boolean>(true)
  const [qtyCharactersPost, setQtyCharactersPost] = useState<number>(0)
  const [post, setPost] = useState<string>('')

  const listOfImages: SourceType[] = []
  const listOfVideos: SourceType[] = []

  const onChangeCreatePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e

    setPost(target.value)
    setQtyCharactersPost(target.value.length)
  }

  const onUploadedFile = (source: SourceType, type: ResourceType) => {
    if (type === 'IMAGE') {
      listOfImages.push(source)
    } else {
      listOfVideos.push(source)
    }
  }

  return (
    <>
      <div className="quick-post">
        <div className="quick-post-header">
          <h3 style={{ padding: '15px' }}>
            <svg className="option-item-icon icon-blog-posts">
              <use xlinkHref="#svg-blog-posts" />
            </svg>{' '}
            {t('home.createPost.title')}
          </h3>
        </div>

        <div className="quick-post-body">
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <FormRow className={classNames(!showUploadPhotos ? styles.show : styles.hide)}>
              <FormItem>
                <div className="form-textarea">
                  <textarea
                    id="quick-post-text"
                    name="quick_post_text"
                    placeholder={t('home.createPost.placeholderPostText')}
                    defaultValue={post}
                    onChange={onChangeCreatePost}
                    minLength={0}
                    maxLength={1000}
                  />{' '}
                  {/* "Hi! Share your post here..." */}
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
                onChange={(tags: string) => {
                  console.log(tags)
                }}
              />
            </div>

            {/* SCHEDULE VIEW */}
            <div className={classNames(showSchedule ? styles.show : styles.hide)}>
              <ScheduleMessage startDate={(date) => console.log(date)} endDate={(date) => console.log(date)} />
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

            <button
              type="button"
              className="button small secondary"
              onClick={() => {
                console.log(JSON.stringify(listOfImages))
                console.log(JSON.stringify(listOfVideos))
              }}
            >
              {t('home.createPost.postButton')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost
