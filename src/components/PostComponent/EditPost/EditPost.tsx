import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import * as Yup from 'yup'

import Monetized from 'views/CreatePost/Status/Monetized/Monetized'
import FormItem from 'components/Common/Form/FormItem'
import PostService from 'services/PostService'
import ButtonWithLoader from '../../Common/ButtonWithLoader'
import FormRow from '../../Common/Form/FormRow'
import FormRowItem from '../../Common/Form/FormRowItem'
import TextArea from '../../Common/TextArea'

import { CommonPostType, PostType, PrivacityType } from '../../../types/PostType'

import styles from './EditPost.module.css'

type EditPostProps = {
  post: PostType
  onClose: () => void
}

type FormValues = {
  content: string
  amount: number
  privacity: PrivacityType
}

const EditPost: FunctionComponent<EditPostProps> = (props) => {
  const { post, onClose } = props
  const user = post.users

  // Validations Fields
  const validationSchema = Yup.object().shape({
    profileDescription: Yup.string(),
  })

  const { control, handleSubmit, setValue, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const [privacy, setPrivacy] = useState<PrivacityType>(post.privacity as PrivacityType)

  const onSubmit = (data: FormValues) => {
    const postEdited: Partial<CommonPostType> = {
      id: post.id,
      content: data.content,
      featuredPost: false,
      tags: [],
      privacity: privacy,
      amount: data.amount,
    }

    const editPostPromise = PostService.editPost(postEdited)
    return toast
      .promise(editPostPromise, {
        loading: 'Saving...',
        success: 'Post edited',
        error: 'Error editing post ....',
      })
      .then((data: any) => {
        window.location.reload()
      })
  }

  useEffect(() => {
    setValue('content', post.content)
    setValue('amount', post.amount)

  }, [])

  const handlePrivacy = () => {
    const privacity = privacy === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC'
    setPrivacy(privacity as PrivacityType)
  }

  return (
    <>
      <div className={styles.mainPopup}>
        <div
          className={styles.closePopup}
          onClick={() => {
            onClose()
          }}
        >
          <FontAwesomeIcon icon="times" color="white" size="1x" />
        </div>

        <div className={styles.headerTip}>
          <h6>Edit post</h6>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormRowItem>
            <Controller
              control={control}
              as={TextArea}
              name="content"
              defaultValue=""
              classNameFormInput="small full"
              placeholder="Post content"
              errorMessage={errors.content?.message}
            />
          </FormRowItem>

          <FormRow style={{ flexFlow: 'row' }}>
            <FormItem style={{ width: '40px' }}>
              <Controller
                control={control}
                name="amount"
                defaultValue=""
                render={(propsController) => (
                  <Monetized
                    defaultAmount={propsController.value || 0}
                    name={propsController.name}
                    onApplyMonetize={(amount: number) => {
                      propsController.onChange(amount)
                    }}
                  />
                )}
              />
            </FormItem>
            <FormItem>
              <div className="quick-post-footer-action">
                <svg className="form-input-icon icon-private" onClick={handlePrivacy}>
                  {privacy === 'PUBLIC' ? (
                    <use xlinkHref="#svg-public" fill="#adafca" />
                  ) : (
                    <use xlinkHref="#svg-private" fill="#adafca" />
                  )}
                </svg>
              </div>
            </FormItem>
          </FormRow>

          <FormRowItem>
            <ButtonWithLoader type="submit" className="button small secondary" showLoader={formState.isSubmitting}>
              Edit
            </ButtonWithLoader>
          </FormRowItem>
        </form>
      </div>
    </>
  )
}

export default EditPost
