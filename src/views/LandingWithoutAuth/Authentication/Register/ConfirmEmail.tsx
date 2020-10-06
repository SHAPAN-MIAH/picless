import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import FormRow from '../../../../components/Common/Form/FormRow'

import {
  confirmSignUp,
  emailSelected,
  errors,
  getAction,
  messages,
  resendConfirmationCode,
} from '../../../../redux/slices/AuthView'

import TextInput from '../../../../components/Common/TextInput'

import Alert from '../../../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'

const ConfirmEmail = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const error: string = useSelector(errors)
  const message: string = useSelector(messages)
  const currentAction = useSelector(getAction)
  const email: string = useSelector(emailSelected)
  const dispatch = useDispatch()

  const [code, setCode] = useState('')

  useEffect(() => {
    if (currentAction.action === 'CONFIRM_EMAIL' && currentAction.status === 'FINISHED') {
      history.push('/')
    }
  })

  const clickConfirmSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(confirmSignUp(email, code))
  }

  const resendVerificationCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    dispatch(resendConfirmationCode(email))
  }

  const showLoader = currentAction.action === 'CONFIRM_EMAIL' && currentAction.status === 'WAITING'

  return (
    <div>
      <h2 className="form-box-title">{t('authentication.enterEmailCode')}</h2>

      <form className="form" onSubmit={clickConfirmSignUp}>
        <FormRow>
          <p>{t('authentication.confirmEmailMessage')}</p>
        </FormRow>

        <FormRowItem>
          <TextInput
            type="text"
            id="verification-code"
            name="verification_code"
            placeholder={t('authentication.code')}
            defaultValue={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </FormRowItem>

        <FormRow classNameRow="flex-end">
          <a className="form-link" href="#/" onClick={resendVerificationCode}>
            {t('authentication.resendVerificationCode')}
          </a>
        </FormRow>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium primary" showLoader={showLoader}>
            {t('authentication.confirm')}
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

export default ConfirmEmail
