import React, { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import PasswordStrengthBar from 'react-password-strength-bar'

import { errors, messages, register, getAction } from '../../../../redux/slices/Auth'

import TextInput from '../../../../components/Common/TextInput'

import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import Alert from '../../../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'

const RegisterForm = () => {
  const { t } = useTranslation()

  const error = useSelector(errors)
  const message = useSelector(messages)
  const currentAction = useSelector(getAction)
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const signUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(register(email, password, passwordRepeat))
  }

  const showLoader = currentAction.action === 'REGISTER' && currentAction.status === 'WAITING'

  const scoreWords = [
    t('passwordStrengthBar.scoreWords.weak'),
    t('passwordStrengthBar.scoreWords.okay'),
    t('passwordStrengthBar.scoreWords.good'),
    t('passwordStrengthBar.scoreWords.strong'),
  ]
  return (
    <div>
      <h2 className="form-box-title">{t('authentication.registerTitle')}</h2>

      <form className="form" onSubmit={signUp}>
        <FormRowItem>
          <TextInput
            type="text"
            id="register-email"
            name="register_email"
            placeholder={t('authentication.yourEmail')}
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRowItem>

        <FormRowItem>
          <TextInput
            type="password"
            id="register-password"
            name="register_password"
            placeholder={t('authentication.password')}
            defaultValue={password}
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
            defaultValue={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
        </FormRowItem>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium primary" showLoader={showLoader}>
            {t('authentication.registerButton')}
          </ButtonWithLoader>
        </FormRow>

        <FormRow>
          {error && <Alert alertType="DANGER" message={t(error)} style={{ width: '100%' }} />}
          {message && <Alert alertType="PRIMARY" message={t(message)} style={{ width: '100%' }} />}
        </FormRow>
      </form>

      <p className="form-text">
        {t('authentication.registerConfimationEmailMessage')}
        <a href="http://google.com">{t('authentication.contactUs')}</a>!
      </p>
    </div>
  )
}

export default RegisterForm
