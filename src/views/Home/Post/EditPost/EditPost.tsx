import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import styled from 'styled-components'
import Monetized from 'views/CreatePost/Status/Monetized/Monetized'
import classNames from 'classnames'
import { isMobile } from 'react-device-detect'
import FormItem from 'components/Common/Form/FormItem'
import PostService from 'services/PostService'
import toast from 'react-hot-toast'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import FormRow from '../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import TextArea from '../../../../components/Common/TextArea'

import { CommonPostType, PostType, PrivacityType } from '../../../../types/PostType.d'

import styles from './EditPost.module.css'
import ScheduleTooltip from './ScheduleTooltip/ScheduleTooltip'

type EditPostProps = {
  post: PostType
  onClose: () => void
}

type FormValues = {
  content: string
  schedule: Date
  amount: number
  privacity: PrivacityType
}

const PrivacySelector = styled.select`
  width: 110px;
  border-radius: 5px;
  padding: 1px 1px 1px 10px;
`

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

  const onSubmit = (data: FormValues) => {
    const scheduleData = data.schedule && (data.schedule.toISOString() || '')

    const postEdited: Partial<CommonPostType> = {
      id: post.id,
      content: data.content,
      featuredPost: false,
      tags: [],
      startDate: scheduleData,
      privacity: data.privacity,
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
    setValue('schedule', post.schedule)
  }, [])

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
                name="schedule"
                defaultValue=""
                render={(propsController) => (
                  <ScheduleTooltip
                    scheduleDate={propsController.value || ''}
                    name={propsController.name}
                    onApplySchedule={(date) => {
                      propsController.onChange(date)
                    }}
                  />
                )}
              />
            </FormItem>
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
              <div className="">
                <Controller
                  control={control}
                  name="privacity"
                  defaultValue=""
                  render={(propsController) => (
                    <PrivacySelector
                      defaultValue={propsController.value || 0}
                      name={propsController.name}
                      onChange={(e) => {
                        propsController.onChange(e.target.value as PrivacityType)
                      }}
                    >
                      <option value="PUBLIC">Public</option>
                      <option value="PRIVATE">Private</option>
                    </PrivacySelector>
                  )}
                />
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
