import React, { FunctionComponent, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { useTranslation } from 'react-i18next'

import PasswordStrengthBar from 'react-password-strength-bar'

import AuthService from '../../../../../services/AuthService'

import FormRow from '../../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import TextInput from '../../../../../components/Common/TextInput'
import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'
import Alert from '../../../../../components/Common/Alerts/Alerts'

type FormValues = {
  code: string
  password: string
  confirmPassword: string
}

type ForgotPasswordNewPasswordProps = { username: string; backToLogin: (message?: string) => void }

const ForgotPasswordNewPassword: FunctionComponent<ForgotPasswordNewPasswordProps> = (props) => {
  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    code: Yup.string().required(t(`authentication.errors.codeRequired`)),
    password: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .required(t(`authentication.errors.passwordRequired`))
      .min(4, 'Password must be at least 4 characters'),
    confirmPassword: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .when('password', (password: string, schema: any): any => {
        if (password) return schema.required('authentication.errors.confirmPasswordRequired')
      })
      .oneOf([Yup.ref('password')], 'authentication.errors.passwordDoesntMatch'),
  })

  const { control, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const { username, backToLogin } = props

  const [generalError, setGeneralError] = useState<string>('')

  const onResetPassword = (data: FormValues) => {
    return AuthService.resetPassword(username, data.code, data.password)
      .then(() => {
        backToLogin()
      })
      .catch((err) => {
        if (err.code) {
          setGeneralError(`authentication.errors.${err.code}`)
        } else {
          setGeneralError(`authentication.errors.UnknownError`)
        }
      })
  }

  const scoreWords = [
    t('passwordStrengthBar.scoreWords.weak'),
    t('passwordStrengthBar.scoreWords.okay'),
    t('passwordStrengthBar.scoreWords.good'),
    t('passwordStrengthBar.scoreWords.strong'),
  ]

  return (
    <div>
      <h2 className="form-box-title">{t('authentication.enterResetPasswordVerificationCode')}</h2>

      <form className="form" onSubmit={handleSubmit(onResetPassword)}>
        <FormRow>
          <p>{t('authentication.confirmResetPasswordCode')}</p>
        </FormRow>

        <FormRowItem>
          <Controller
            control={control}
            as={TextInput}
            type="text"
            name="code"
            defaultValue=""
            placeholder={t('authentication.code')}
            errorMessage={errors.code?.message}
          />
        </FormRowItem>

        <FormRowItem>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={(propsController) => (
              <>
                <TextInput
                  type="password"
                  name={propsController.name}
                  ref={propsController.ref}
                  value={propsController.value}
                  placeholder={t('authentication.password')}
                  onChange={(e) => propsController.onChange(e.target.value)}
                  id="register-password"
                />
                <PasswordStrengthBar
                  password={propsController.value}
                  shortScoreWord={t('passwordStrengthBar.shortScoreWord')}
                  scoreWords={scoreWords}
                  minLength={6}
                />
              </>
            )}
          />
        </FormRowItem>

        <FormRowItem>
          <Controller
            control={control}
            as={TextInput}
            type="password"
            name="confirmPassword"
            defaultValue=""
            placeholder={t('authentication.repeatPassword')}
            errorMessage={errors.confirmPassword?.message}
          />
        </FormRowItem>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium primary" showLoader={formState.isSubmitting}>
            {t('authentication.sendConfirmNewPassword')}
          </ButtonWithLoader>
        </FormRow>

        <FormRow>{generalError && <Alert alertType="DANGER" message={t(generalError)} style={{ width: '100%' }} />}</FormRow>
      </form>
    </div>
  )
}

export default ForgotPasswordNewPassword
