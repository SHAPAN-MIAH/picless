import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PasswordStrengthBar from 'react-password-strength-bar'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import TextInput from '../../../../components/Common/TextInput'

import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import Alert from '../../../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import useAuth from '../../../../hooks/useAuth'

import { RegisterViewType } from './Register'
import SimpleCheckboxForm from '../../../../components/Common/SimpleCheckboxForm'

type FormValues = {
  username: string
  password: string
  confirmationPassword: string
  overEighteen: boolean
}

const RegisterForm: FunctionComponent<{
  changeView: (view: RegisterViewType) => void
  setEmail: (value: string) => void
}> = (props) => {
  const { changeView, setEmail } = props
  const { t } = useTranslation()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t(`authentication.errors.emailRequired`))
      .email(t(`authentication.errors.enterValidEmailAddress`)),
    password: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .required(t(`authentication.errors.passwordRequired`)),
    confirmationPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    overEighteen: Yup.boolean()
      .required('You must be at least 18 years old to be a member')
      .oneOf([true], 'You must be at least 18 years old to be a member'),
  })

  const { register } = useAuth()
  const { control, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const [messages, setMessages] = useState<string>('')
  const [generalError, setGeneralError] = useState<string>('')

  const onSubmit = (data: FormValues) => {
    alert('')
    return register(data.username, data.password)
      .then((message) => {
        setMessages(message)

        setEmail(data.username)
        changeView('CONFIRM_EMAIL')
      })
      .catch((err) => {
        setGeneralError(err.message)
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
      <h2 className="form-box-title">{t('authentication.registerTitle')}</h2>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormRowItem>
          <Controller
            control={control}
            as={TextInput}
            type="text"
            name="username"
            defaultValue=""
            placeholder={t('authentication.yourEmail')}
            errorMessage={errors.username?.message}
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
                  classNameFormInput="small active"
                  placeholder={t('changePassword.newPasswordField')}
                  errorMessage={errors.password?.message}
                  onChange={(e) => propsController.onChange(e.target.value)}
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
            name="confirmationPassword"
            defaultValue=""
            classNameFormInput="small active"
            placeholder={t('changePassword.passwordRepeatField')}
            errorMessage={errors.confirmationPassword?.message}
          />
        </FormRowItem>

        <FormRowItem>
          <Controller
            control={control}
            name="overEighteen"
            defaultValue={false}
            render={(propsController) => (
              <SimpleCheckboxForm
                name={propsController.name}
                ref={propsController.ref}
                defaultValue={propsController.value}
                placeholder={t('authentication.overEighteen')}
                onChange={(e) => propsController.onChange(e.target.checked)}
              />
            )}
          />
        </FormRowItem>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium primary" showLoader={formState.isSubmitting}>
            {t('authentication.registerButton')}
          </ButtonWithLoader>
        </FormRow>

        <FormRow>
          {generalError && <Alert alertType="DANGER" message={t(generalError)} style={{ width: '100%' }} />}
          {messages && <Alert alertType="PRIMARY" message={t(messages)} style={{ width: '100%' }} />}
        </FormRow>

        {errors.overEighteen && <Alert alertType="DANGER" message={errors.overEighteen.message} style={{ width: '100%' }} />}
      </form>

      <p className="form-text">
        {t('authentication.registerConfimationEmailMessage')}
        <a href="mailto:GregorioTeAyuda@enjoyr.com">{t('authentication.contactUs')}</a>!
      </p>
    </div>
  )
}

export default RegisterForm
