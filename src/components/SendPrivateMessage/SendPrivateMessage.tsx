import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import useChat, { UserStatusMessagesOptionalType } from 'hooks/useChatMessages'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

import useUser from '../../hooks/useUser'

import ButtonWithLoader from '../Common/ButtonWithLoader'
import FormRow from '../Common/Form/FormRow'
import FormRowItem from '../Common/Form/FormRowItem'
import TextArea from '../Common/TextArea'
import UserAvatar from '../UserAvatar'

import styles from './SendPrivateMessage.module.css'
import { PostType } from 'types/PostType'

type FormValues = {
  message: string
}

type SendPrivateMessageProps = {
  post: PostType
  onClose: () => void
}

const SendPrivateMessage: FunctionComponent<SendPrivateMessageProps> = (props) => {
  const { post, onClose } = props

  const user = post.users

  const { userId } = useUser()
  const { sendMessage } = useChat()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    message: Yup.string().required('The message field is required'),
  })

  const { control, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (formData: FormValues) => {
    const userSelected: UserStatusMessagesOptionalType = {
      userId,
      email: user.email || '',
      connectionId: null,
    }

    const sendMessagePromise = sendMessage(userSelected, formData.message)
    return toast
      .promise(sendMessagePromise, {
        loading: 'Sending ...',
        success: 'Message sended',
        error: 'Error sending message',
      })
      .then(() => {
        onClose()
      })
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
          <h6>Send private message to:</h6>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormRowItem>
            <div className={styles.userInfoContainer}>
              <div className={styles.userInfoImage}>
                <UserAvatar size="S" imageName={user.profilePicture} />
              </div>
              <div className={styles.userInfoName}>
                <p className="user-status-title">
                  <span className="bold">{user.fullName}</span>
                </p>
                <p className="user-status-text small">
                  <a href={`/u/${user.userName}`}>@{user.userName}</a>
                </p>
              </div>
            </div>
          </FormRowItem>

          <FormRowItem>
            <Controller
              control={control}
              as={TextArea}
              name="message"
              defaultValue=""
              classNameFormInput="small full"
              placeholder="Write me something..."
              errorMessage={errors.message?.message}
            />
          </FormRowItem>

          <FormRow>
            <ButtonWithLoader type="submit" className="button small secondary" showLoader={formState.isSubmitting}>
              Send
            </ButtonWithLoader>
          </FormRow>
        </form>
      </div>
    </>
  )
}

export default SendPrivateMessage
