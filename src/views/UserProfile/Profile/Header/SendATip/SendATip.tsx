import React, { FunctionComponent, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import useUser from '../../../../../hooks/useUser'

import UserService from '../../../../../services/UserService'

import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import TextInput from '../../../../../components/Common/TextInput'
import FormRow from '../../../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'
import UserAvatar from '../../../../../components/UserAvatar'

import { UserType, TipType } from '../../../../../types/UserType.d'

import TextArea from '../../../../../components/Common/TextArea'
import Alert from '../../../../../components/Common/Alerts/Alerts'
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

    return UserService.sendATip(tip).then((data: { code: string; message: string }) => {
      switch (data.code) {
        case '0':
          if (callback) {
            callback('SUCCESS')
          }
          if (onClose) onClose()
          break
        case '2':
          if (callback) {
            callback('ERROR', data.message)
          }

          if (data.message === 'Insufficient balance') setErrorMessage(data.message)
          break
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
          <h6>Send tip top</h6>
        </div>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <FormRowItem>
            <div className={styles.userInfoContainer}>
              <div className={styles.userInfoImage}>
                <UserAvatar size="SMALL" imageName={user.profilePicture} />
              </div>
              <div className={styles.userInfoName}>
                <p className="user-status-title">
                  <span className="bold">{user.fullName}</span>
                </p>
                <p className="user-status-text small">
                  <a href={`/user/${user.userName}`}>@{user.userName}</a>
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

      {/* <div className={styles.mainPopup}>
        <div className={styles.headerTip}>
          <h4>Send a tip</h4>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <FormRowItem>
            <div className="form-input active">
              <label htmlFor="input-example">Enter amount {user.userName}</label>
              <CurrencyInput
                id="input-tip"
                name="input_tip"
                value={cash}
                allowDecimals
                decimalsLimit={2}
                onChange={(value) => setCash(parseInt(value as string, 10))}
              />
            </div>

          </FormRowItem>

          <FormRowItem>
            <TextInput
              type="text"
              id="message"
              name="message"
              placeholder="Write me something"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormRowItem>

          <FormRow>
            <ButtonWithLoader type="submit" className="button small secondary" showLoader={false}>
              SendTip
            </ButtonWithLoader>
          </FormRow>
        </form>
      </div> */}
    </>
  )
}

export default SendATip
