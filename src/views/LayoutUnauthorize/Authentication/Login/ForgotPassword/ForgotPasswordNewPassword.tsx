import React, { FormEvent, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import PasswordStrengthBar from 'react-password-strength-bar'

import { userAuthSelector, errorSelector, getAction, messageSelector } from '../../../../../redux/Auth/AuthSelectors'
import { resetPassword } from '../../../../../redux/Auth/AuthThunks'

import FormRow from '../../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import TextInput from '../../../../../components/Common/TextInput'
import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'
import Alert from '../../../../../components/Common/Alerts/Alerts'

const ForgotPasswordNewPassword = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const currentAction = useSelector(getAction)
  const userAuth = useSelector(userAuthSelector)

  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const onResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(resetPassword(userAuth.email, code, password, passwordRepeat))
  }

  const showLoader = currentAction.action === 'FORGOT_PASSWORD_NEW_PASSWORD' && currentAction.status === 'WAITING'

  const scoreWords = [
    t('passwordStrengthBar.scoreWords.weak'),
    t('passwordStrengthBar.scoreWords.okay'),
    t('passwordStrengthBar.scoreWords.good'),
    t('passwordStrengthBar.scoreWords.strong'),
  ]

  return (
    <div>
      <h2 className="form-box-title">{t('authentication.enterResetPasswordVerificationCode')}</h2>

      <form className="form" onSubmit={onResetPassword}>
        <FormRow>
          <p>{t('authentication.confirmResetPasswordCode')}</p>
        </FormRow>

        <FormRowItem>
          <TextInput
            type="text"
            id="reset-password-code"
            name="reset-password-code"
            placeholder={t('authentication.code')}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </FormRowItem>

        <FormRowItem>
          <TextInput
            type="password"
            id="register-password"
            name="register_password"
            placeholder={t('authentication.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthBar
            password={password}
            shortScoreWord={t('passwordStrengthBar.shortScoreWord')}
            scoreWords={scoreWords}
            minLength={6}
          />
        </FormRowItem>

        <FormRowItem>
          <TextInput
            type="password"
            id="register-password-repeat"
            name="register_password_repeat"
            placeholder={t('authentication.repeatPassword')}
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </FormRowItem>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium primary" showLoader={showLoader}>
            {t('authentication.sendConfirmNewPassword')}
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

export default ForgotPasswordNewPassword
