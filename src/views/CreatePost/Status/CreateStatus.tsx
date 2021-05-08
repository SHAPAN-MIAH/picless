import classNames from 'classnames'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

import useRouter from 'hooks/commons/useRouter'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import useUser from '../../../hooks/useUser'
import PostService from '../../../services/PostService'
import { CommonPostType, PrivacityType, SourceType } from '../../../types/PostType.d'
import styles from './CreateStatus.module.css'
import ScheduleMessage from './ScheduleMessage/ScheduleMessage'
import UploadSourcePost from './UploadSourcePost/UploadSourcePost'
import Monetized from './Monetized/Monetized'

const FormTextAreaDiv = styled.div`
  margin-right: 0px;
`

const PrivacyIconContainerDiv = styled.div`
  position: absolute;
  top: 34%;
  margin-left: 85px;

  @media screen and (max-width: 1070px) {
    top: 55px;
    margin-left: 70px;
  }
`
const PrivacySelector = styled.select`
  width: 110px;
  border-radius: 5px;
  padding: 1px 1px 1px 10px;

  @media screen and (max-width: 1070px) {
    margin-top: 10px;
    margin-left: -15px;
  }
`

const CreateStatus: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { user } = useUser()
  const router = useRouter()

  const [showUploadPhotos, setShowUploadPhotos] = useState<boolean>(false)
  // const [showTags, setShowTags] = useState<boolean>(false)
  const [showSchedule, setShowSchedule] = useState<boolean>(false)

  const [qtyCharactersPost, setQtyCharactersPost] = useState<number>(0)

  const [content, setContent] = useState<string>('')
  const [startDate, setStartDate] = useState<Date | null>()
  const [privacy, setPrivacy] = useState<PrivacityType>('PUBLIC')
  const [monetizedAmount, setMonetizedAmount] = useState<number>(0)

  const [loading, setLoading] = useState<boolean>(false)
  const [imageList, setImageList] = useState<SourceType[]>()
  const [videoList, setVideoList] = useState<SourceType[]>()

  // const [tagsList, setTagsList] = useState<string[]>([])

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
        startDate: startDate || '',
        images: imageList,
        videos: videoList,
        privacity: privacy,
        amount: monetizedAmount,
      }

      PostService.createPost(post).then(() => {
        setLoading(false)

        cleanCreatePost()
      })
    }
  }

  const handlePrivacy = () => {    
    const privacity = privacy  === "PUBLIC" ? "PRIVATE" : "PUBLIC"; 
    setPrivacy(privacity as PrivacityType)
  }
  // const convertToTagType = (): TagType[] => {
  //   const tags: TagType[] = []

  //   tagsList.forEach((tag) => {
  //     tags.push({ tagName: tag })
  //   })
  //   return tags
  // }

  const cleanCreatePost = () => {
    router.push('/user/home')
  }

  const onLoading = (status: boolean) => {
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
          <ScheduleMessage
            className={classNames(styles.scheduleMessageContainer, showSchedule ? styles.active : '')}
            onApplySchedule={(start) => {
              setStartDate(start)
              setShowSchedule(false)
            }}
          />
        </form>
      </div>

      <div className="quick-post-footer" style={{ position: 'relative', backgroundColor: '#fff', padding: '0 15px' }}>
        <div className={classNames('quick-post-footer-actions', isMobile ? styles.quickPostFooterActionsLeft : '')}>
          <div
            className="quick-post-footer-action"
            style={{ paddingLeft: '0px' }}
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

          <Monetized
            onApplyMonetize={(amount: number) => {
              setMonetizedAmount(amount)
            }}
          />

          <div className="quick-post-footer-action">
            <svg className="form-input-icon icon-private" onClick={handlePrivacy} >
                {privacy === 'PUBLIC' ? <use xlinkHref="#svg-public" fill="#adafca" /> : <use xlinkHref="#svg-private" fill="#adafca" />}
              </svg>
          </div>
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
