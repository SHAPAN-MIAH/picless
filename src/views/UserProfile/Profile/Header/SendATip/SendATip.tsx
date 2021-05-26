import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { FunctionComponent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Alert from '../../../../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'
import FormRow from '../../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import TextArea from '../../../../../components/Common/TextArea'
import TextInput from '../../../../../components/Common/TextInput'
import UserAvatar from '../../../../../components/UserAvatar'
import useUser from '../../../../../hooks/useUser'
import UserService from '../../../../../services/UserService'
import { TipType, UserType } from '../../../../../types/UserType'
import styles from './SendATip.module.css'

type FormValues = {
  amount: string
  message: string
}

type SendATipProps = { user: UserType; callback?: (result: string, messages?: string) => void; onClose?: () => void }

const SendATip: FunctionComponent<SendATipProps> = (props) => {
  const { user, callback, onClose } = props

  const { userId } = useUser()

  const [errorMessage, setErrorMessage] = useState('')

  // Validations Fields
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .integer('The amount should be whole number')
      .min(4.9999, 'Minimum 5')
      .required('Please enter an valid amount'),

    message: Yup.string(),
  })

  const { control, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (formData: FormValues) => {
    const tip: TipType = {
      fromId: userId,
      toId: user.id?.toString() || '',
      message: formData.message,
      cash: parseFloat(formData.amount),
    }
    toast.loading('Waiting...')

    return UserService.sendATip(tip).then((data: { code: string; message: string; path: string }) => {
      switch (data.code) {
        case '0':
          if (data.message === 'succeeded') {
            if (callback) {
              callback('SUCCESS')
            }
            if (onClose) onClose()
            break
          } else if (data.message === 'redirect') {
            window.location.href = data.path
          }
        case '1':
          if (callback) {
            callback('ERROR', data.message)
          }

        default:
          if (callback) {
            callback('ERROR', data.message)
          }
          if (onClose) onClose()
          break
      }
    })
  }

  return (
    <>
      <div className={styles.mainPopup}>
        <div
          className={styles.closePopup}
          onClick={() => {
            if (onClose) onClose()
          }}
        >
          <FontAwesomeIcon icon="times" color="white" size="1x" />
        </div>

        <div className={styles.headerTip}>
          <h6>Send tip</h6>
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
              as={TextInput}
              type="text"
              name="amount"
              defaultValue="5"
              required
              placeholder="Enter amount"
              classNameFormInput="small active"
              errorMessage={errors.amount?.message}
            />{' '}
          </FormRowItem>
          <FormRowItem>
            <Controller
              control={control}
              as={TextArea}
              name="message"
              defaultValue=""
              classNameFormInput="small full"
              placeholder="Write me something (Optional)"
              errorMessage={errors.message?.message}
            />
          </FormRowItem>

          {errorMessage && (
            <Alert alertType="DANGER" style={{ width: '100%' }}>
              {errorMessage}
              Please <Link to="/account/wallet/"> Add founds</Link>
            </Alert>
          )}

          <FormRow>
            <ButtonWithLoader type="submit" className="button small secondary" showLoader={formState.isSubmitting}>
              Send a tip!
            </ButtonWithLoader>
          </FormRow>
        </form>
      </div>
    </>
  )
}

export default SendATip
