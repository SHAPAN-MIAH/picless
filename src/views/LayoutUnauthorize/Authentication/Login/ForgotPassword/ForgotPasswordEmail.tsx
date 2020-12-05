import React, { FormEvent, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'

import { userAuthSelector, errorSelector, getAction, messageSelector } from '../../../../../redux/Auth/AuthSelectors'
import { forgotPasswordSendCode } from '../../../../../redux/Auth/AuthThunks'
import FormRow from '../../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import TextInput from '../../../../../components/Common/TextInput'
import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'
import Alert from '../../../../../components/Common/Alerts/Alerts'

const ForgotPasswordEmail = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const currentAction = useSelector(getAction)
  const userAuth = useSelector(userAuthSelector)

  const [emailState, setEmailState] = useState(userAuth.email)

  const clickSendVerificationCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(forgotPasswordSendCode(emailState))
  }

  const showLoader = currentAction.action === 'FORGOT_PASSWORD_EMAIL' && currentAction.status === 'WAITING'

  return (
    <div>
      <h2 className="form-box-title">{t('authentication.putEmailToResetPassword')}</h2>

      <form className="form" onSubmit={clickSendVerificationCode}>
        <FormRow>
          <p>{t('authentication.putEmailToResetPasswordMessage')}</p>
        </FormRow>

        <FormRowItem>
          <TextInput
            type="text"
            id="reset-password-email"
            name="reset-password-email"
            placeholder={t('authentication.resetPasswordEmail')}
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
          />
        </FormRowItem>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium primary" showLoader={showLoader}>
            {t('authentication.sendVerificationCode')}
          </ButtonWithLoader>
        </FormRow>

        <FormRow>
          {error && <Alert alertType="DANGER" message={t(error)} style={{ width: '100%' }} />}
          {message && <Alert alertType="PRIMARY" message={t(message)} style={{ width: '100%' }} />}
        </FormRow>
      </form>
    </div>
  )
}

export default ForgotPasswordEmail
