import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import FormRow from '../../../../components/Common/Form/FormRow'

import { userAuthSelector, errorSelector, getAction, messageSelector } from '../../../../redux/Auth/AuthSelectors'
import { confirmSignUp, resendConfirmationCode } from '../../../../redux/Auth/AuthThunks'

import TextInput from '../../../../components/Common/TextInput'

import Alert from '../../../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'

const ConfirmEmail = () => {
  const { t } = useTranslation()
  const history = useHistory()

  const currentAction = useSelector(getAction)
  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const userAuth = useSelector(userAuthSelector)
  const dispatch = useDispatch()

  const [code, setCode] = useState('')

  useEffect(() => {
    if (currentAction.action === 'CONFIRM_EMAIL' && currentAction.status === 'FINISHED') {
      history.push('/')
    }
  })

  const clickConfirmSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(confirmSignUp(userAuth.email, code))
  }

  const resendVerificationCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    dispatch(resendConfirmationCode(userAuth.email))
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
            value={code}
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
