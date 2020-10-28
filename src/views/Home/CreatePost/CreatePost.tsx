/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

// import 'react-circular-progressbar/dist/styles.css'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import UploadSourcePost from './UploadSourcePost/UploadSourcePost'

import { ResourceType, SourceType } from '../../../types/PostType.d'

import styles from './CreatePost.module.css'
import InputTags from '../../../components/InputTags/InputTags'

const CreatePost: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const [showUploadPhotos, setShowUploadPhotos] = useState<boolean>(false)
  const [showTags, setShowTags] = useState<boolean>(false)
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
            {t('home.createpost.title')}
          </h3>
        </div>

        <div className="quick-post-body">
          <form className="form">
            <FormRow className={classNames(!showUploadPhotos ? styles.show : styles.hide)}>
              <FormItem>
                <div className="form-textarea">
                  <textarea
                    id="quick-post-text"
                    name="quick-post-text"
                    placeholder={t('home.createpost.placeholderPostText')}
                    defaultValue={post}
                    onChange={onChangeCreatePost}
                    minLength={0}
                    maxLength={1000}
                  />{' '}
                  {/* "Hi! Share your post here..." */}
                  <p className="form-textarea-limit-text">
                    {qtyCharactersPost >= 1000 && (
                      <span style={{ color: 'red' }}>{`(${t('home.createpost.error.limitCharacters')})  `}</span>
                    )}
                    {`${qtyCharactersPost}/1000`}
                  </p>
                </div>
              </FormItem>
            </FormRow>

            {/* UPLOADPHOTO VIEW */}
            {showUploadPhotos && (
              <UploadSourcePost
                onUploadedFile={onUploadedFile}
                onClose={() => {
                  setShowUploadPhotos(false)
                }}
              />
            )}

            {showTags && (
              <FormRow>
                <FormItem style={{ padding: '0px !important' }}>
                  <InputTags
                    onChange={(tags: string) => {
                      console.log(tags)
                    }}
                  />
                </FormItem>
              </FormRow>
            )}
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
