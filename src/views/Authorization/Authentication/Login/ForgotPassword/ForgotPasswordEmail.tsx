import React, { FunctionComponent, useState } from 'react'
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useTranslation } from 'react-i18next'

import AuthService from '../../../../../services/AuthService'
import FormRow from '../../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import TextInput from '../../../../../components/Common/TextInput'
import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'
import Alert from '../../../../../components/Common/Alerts/Alerts'
import { CurrentView } from '../Login'

type FormValues = {
  username: string
}

type ForgotPasswordEmailProps = {
  changeView: (view: CurrentView) => void
  setUserName: (username: string) => void
}

const ForgotPasswordEmail: FunctionComponent<ForgotPasswordEmailProps> = (props) => {
  const { t } = useTranslation()

  const { changeView, setUserName } = props

  // Validations Form
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t(`authentication.errors.emailRequired`))
      .email(t(`authentication.errors.enterValidEmailAddress`)),
  })

  const { control, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const [generalError, setGeneralError] = useState<string>('')

  const sendVerificationCode = (data: FormValues) => {
    return AuthService.forgotPasswordSendCode(data.username)
      .then(() => {
        changeView('FORGOT_PASSWORD_NEW_PASSWORD')
        setUserName(data.username)
      })
      .catch((err) => {
        setGeneralError(`authentication.errors.${err.code}`)
      })
  }

  return (
    <div>
      <h2 className="form-box-title">{t('authentication.putEmailToResetPassword')}</h2>

      <form className="form" onSubmit={handleSubmit(sendVerificationCode)}>
        <FormRow>
          <p>{t('authentication.putEmailToResetPasswordMessage')}</p>
        </FormRow>

        <FormRowItem>
          <Controller
            control={control}
            as={TextInput}
            type="text"
            name="username"
            defaultValue=""
            placeholder={t('authentication.resetPasswordEmail')}
            errorMessage={errors.username?.message}
          />
        </FormRowItem>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium primary" showLoader={formState.isSubmitting}>
            {t('authentication.sendVerificationCode')}
          </ButtonWithLoader>
        </FormRow>

        <FormRow>{generalError && <Alert alertType="DANGER" message={t(generalError)} style={{ width: '100%' }} />}</FormRow>
      </form>
    </div>
  )
}

export default ForgotPasswordEmail
