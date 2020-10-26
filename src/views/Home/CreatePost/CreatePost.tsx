/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

// import 'react-circular-progressbar/dist/styles.css'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import UploadSourcePost from './UploadSourcePost/UploadSourcePost'

import styles from './CreatePost.module.css'

const CreatePost: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const [showUploadPhotos, setShowUploadPhotos] = useState<boolean>(false)
  const [qtyCharactersPost, setQtyCharactersPost] = useState<number>(0)
  const [post, setPost] = useState<string>('')

  const onChangeCreatePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target } = e

    setPost(target.value)
    setQtyCharactersPost(target.value.length)
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
          <form className="form">
            <FormRow className={classNames(!showUploadPhotos ? styles.show : styles.hide)}>
              <FormItem>
                <div className="form-textarea">
                  <textarea
                    id="quick-post-text"
                    name="quick-post-text"
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
              show={showUploadPhotos}
              onClose={() => {
                setShowUploadPhotos(false)
              }}
            />
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

            <div className="quick-post-footer-action text-tooltip-tft-medium" data-title="Insert Tag">
              <svg className="quick-post-footer-action-icon icon-tags">
                <use xlinkHref="#svg-tags" />
              </svg>
            </div>
          </div>

          <div className="quick-post-footer-actions">
            <p className="button small void">{t('home.createPost.discardButton')}</p>

            <p className="button small secondary">{t('home.createPost.postButton')}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePost
